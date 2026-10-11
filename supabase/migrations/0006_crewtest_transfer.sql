-- Crew'mong Us — production transfer of validated CREWTEST features
-- Adds streamer aliases/avatars, logger import metadata, vote statistics,
-- player rename support, whole-game deletion and JSON logger import.

alter table public.players
  add column if not exists aliases text[] not null default '{}'::text[],
  add column if not exists avatar_url text not null default '';

alter table public.games
  add column if not exists started_at timestamptz,
  add column if not exists fingerprint text,
  add column if not exists fingerprints text[] not null default '{}'::text[],
  add column if not exists logger_version text not null default '',
  add column if not exists sources text[] not null default '{}'::text[],
  add column if not exists raw_log jsonb;

create unique index if not exists games_fingerprint_uidx
  on public.games(fingerprint)
  where fingerprint is not null and fingerprint <> '';

alter table public.records
  add column if not exists vote_cast bigint not null default 0,
  add column if not exists vote_player bigint not null default 0,
  add column if not exists vote_impostor bigint not null default 0,
  add column if not exists vote_crew bigint not null default 0,
  add column if not exists vote_skip bigint not null default 0,
  add column if not exists vote_no_vote bigint not null default 0,
  add column if not exists vote_self bigint not null default 0,
  add column if not exists crew_vote_total bigint not null default 0,
  add column if not exists crew_vote_correct bigint not null default 0,
  add column if not exists crew_vote_wrong bigint not null default 0;

create or replace function public.admin_update_player(
  p_player_id uuid,
  p_name text,
  p_handle text,
  p_aliases text[],
  p_avatar_url text,
  p_active boolean
)
returns public.players
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_old_name text;
  v_result public.players;
begin
  if not (select private.has_role('admin')) then
    raise exception 'Accès refusé';
  end if;

  select name into v_old_name
  from public.players
  where id = p_player_id;

  if v_old_name is null then
    raise exception 'Joueur introuvable';
  end if;

  if p_name is null or btrim(p_name) = '' or p_handle is null or btrim(p_handle) = '' then
    raise exception 'Nom et pseudo Twitch requis';
  end if;

  if p_name <> v_old_name then
    update public.records
    set
      kills = array_replace(kills, v_old_name, p_name),
      death = case
        when death = 'Tué par ' || v_old_name then 'Tué par ' || p_name
        else death
      end,
      note = replace(note, v_old_name, p_name),
      updated_at = now()
    where v_old_name = any(kills)
       or death = 'Tué par ' || v_old_name
       or note like '%' || v_old_name || '%';
  end if;

  update public.players
  set
    name = btrim(p_name),
    handle = btrim(p_handle),
    aliases = coalesce(p_aliases, '{}'::text[]),
    avatar_url = coalesce(btrim(p_avatar_url), ''),
    active = coalesce(p_active, true),
    updated_at = now()
  where id = p_player_id
  returning * into v_result;

  return v_result;
end;
$$;

revoke all on function public.admin_update_player(uuid,text,text,text[],text,boolean) from public, anon;
grant execute on function public.admin_update_player(uuid,text,text,text[],text,boolean) to authenticated;

create or replace function public.admin_delete_game(p_game_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_session_id text;
  v_game_number bigint;
begin
  if not (select private.has_role('admin')) then
    raise exception 'Accès refusé';
  end if;

  select session_id, game_number
    into v_session_id, v_game_number
  from public.games
  where id = p_game_id;

  if v_session_id is null then
    raise exception 'Game introuvable';
  end if;

  delete from public.games where id = p_game_id;

  update public.games
  set game_number = -game_number
  where session_id = v_session_id
    and game_number > v_game_number;

  update public.games
  set game_number = (-game_number) - 1
  where session_id = v_session_id
    and game_number < 0;
end;
$$;

revoke all on function public.admin_delete_game(uuid) from public, anon;
grant execute on function public.admin_delete_game(uuid) to authenticated;

create or replace function public.admin_delete_record(p_record_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_game_id uuid;
  v_session_id text;
  v_game_number bigint;
begin
  if not (select private.has_role('admin')) then
    raise exception 'Accès refusé';
  end if;

  select r.game_id, g.session_id, g.game_number
    into v_game_id, v_session_id, v_game_number
  from public.records r
  join public.games g on g.id = r.game_id
  where r.id = p_record_id;

  if v_game_id is null then
    raise exception 'Fiche introuvable';
  end if;

  delete from public.records where id = p_record_id;

  if not exists (select 1 from public.records where game_id = v_game_id) then
    delete from public.games where id = v_game_id;

    update public.games
    set game_number = -game_number
    where session_id = v_session_id
      and game_number > v_game_number;

    update public.games
    set game_number = (-game_number) - 1
    where session_id = v_session_id
      and game_number < 0;
  else
    update public.games g
    set t1_deaths = (
      select count(*)
      from public.records r
      where r.game_id = g.id
        and r.role = 'Crew'
        and r.turn = 1
    )
    where g.id = v_game_id;
  end if;
end;
$$;

revoke all on function public.admin_delete_record(uuid) from public, anon;
grant execute on function public.admin_delete_record(uuid) to authenticated;

create or replace function public.admin_import_logger_game(
  p_existing_game_id uuid,
  p_session_id text,
  p_date_label text,
  p_month text,
  p_label text,
  p_game_number bigint,
  p_map text,
  p_winner text,
  p_method text,
  p_t1_deaths bigint,
  p_started_at timestamptz,
  p_fingerprint text,
  p_fingerprints text[],
  p_logger_version text,
  p_sources text[],
  p_raw_log jsonb,
  p_records jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_game_id uuid;
  v_target_number bigint;
  v_game_count bigint;
  v_record jsonb;
  v_player_id uuid;
  v_name text;
  v_sabotages text[];
  v_kills text[];
begin
  if not (select private.has_role('admin')) then
    raise exception 'Accès refusé';
  end if;

  if p_session_id is null or p_session_id !~ '^\d{4}-\d{2}-\d{2}$' then
    raise exception 'Session invalide';
  end if;

  if p_winner not in ('Imposteurs','Crewmates') then
    raise exception 'Camp gagnant invalide';
  end if;

  insert into public.sessions(id,date_label,month,label)
  values (p_session_id,p_date_label,p_month,p_label)
  on conflict (id) do nothing;

  if p_existing_game_id is null then
    lock table public.games in share row exclusive mode;

    select count(*) into v_game_count
    from public.games
    where session_id = p_session_id;

    v_target_number := greatest(
      1,
      least(coalesce(p_game_number,v_game_count + 1),v_game_count + 1)
    );

    update public.games
    set game_number = -game_number
    where session_id = p_session_id
      and game_number >= v_target_number;

    update public.games
    set game_number = (-game_number) + 1
    where session_id = p_session_id
      and game_number < 0;

    insert into public.games(
      session_id,game_number,map,winner,method,t1_deaths,
      started_at,fingerprint,fingerprints,logger_version,sources,raw_log
    )
    values (
      p_session_id,v_target_number,p_map,p_winner,p_method,coalesce(p_t1_deaths,0),
      p_started_at,nullif(p_fingerprint,''),coalesce(p_fingerprints,'{}'::text[]),
      coalesce(p_logger_version,''),coalesce(p_sources,'{}'::text[]),p_raw_log
    )
    returning id into v_game_id;
  else
    select id into v_game_id
    from public.games
    where id = p_existing_game_id
      and session_id = p_session_id;

    if v_game_id is null then
      raise exception 'Game existante introuvable';
    end if;

    update public.games
    set
      map = p_map,
      winner = p_winner,
      method = p_method,
      t1_deaths = coalesce(p_t1_deaths,0),
      started_at = coalesce(p_started_at,started_at),
      fingerprint = coalesce(nullif(p_fingerprint,''),fingerprint),
      fingerprints = coalesce(p_fingerprints,fingerprints),
      logger_version = coalesce(p_logger_version,logger_version),
      sources = coalesce(p_sources,sources),
      raw_log = coalesce(p_raw_log,raw_log)
    where id = v_game_id;
  end if;

  for v_record in
    select value
    from jsonb_array_elements(coalesce(p_records,'[]'::jsonb))
  loop
    v_name := btrim(coalesce(v_record->>'name',''));
    if v_name = '' then
      continue;
    end if;

    select id into v_player_id
    from public.players
    where name = v_name;

    if v_player_id is null then
      insert into public.players(name,handle,aliases,avatar_url,active,source)
      values (v_name,v_name,'{}'::text[],'',true,'admin')
      returning id into v_player_id;
    end if;

    insert into public.session_participants(session_id,player_id)
    values (p_session_id,v_player_id)
    on conflict (session_id,player_id) do nothing;

    select coalesce(array_agg(value),'{}'::text[]) into v_sabotages
    from jsonb_array_elements_text(coalesce(v_record->'sabotages','[]'::jsonb));

    select coalesce(array_agg(value),'{}'::text[]) into v_kills
    from jsonb_array_elements_text(coalesce(v_record->'kills','[]'::jsonb));

    insert into public.records(
      game_id,player_id,role,reports,self_reports,sabotage_count,sabotages,repair,kills,
      death,death_pos,turn,tasks,total_tasks,ejected,note,
      vote_cast,vote_player,vote_impostor,vote_crew,vote_skip,vote_no_vote,vote_self,
      crew_vote_total,crew_vote_correct,crew_vote_wrong
    )
    values (
      v_game_id,
      v_player_id,
      v_record->>'role',
      coalesce((v_record->>'reports')::bigint,0),
      coalesce((v_record->>'self')::bigint,0),
      cardinality(v_sabotages),
      v_sabotages,
      coalesce((v_record->>'repair')::bigint,0),
      case when v_record->>'role' = 'Imposteur' then v_kills else '{}'::text[] end,
      coalesce(v_record->>'death','Survit'),
      case when nullif(v_record->>'deathPos','') is null then null else (v_record->>'deathPos')::bigint end,
      case when nullif(v_record->>'turn','') is null then null else (v_record->>'turn')::bigint end,
      case when nullif(v_record->>'tasks','') is null then null else (v_record->>'tasks')::bigint end,
      case when nullif(v_record->>'totalTasks','') is null then null else (v_record->>'totalTasks')::bigint end,
      coalesce((v_record->>'ejected')::boolean,false),
      coalesce(v_record->>'note',''),
      coalesce((v_record->>'voteCast')::bigint,0),
      coalesce((v_record->>'votePlayer')::bigint,0),
      coalesce((v_record->>'voteImpostor')::bigint,0),
      coalesce((v_record->>'voteCrew')::bigint,0),
      coalesce((v_record->>'voteSkip')::bigint,0),
      coalesce((v_record->>'voteNoVote')::bigint,0),
      coalesce((v_record->>'voteSelf')::bigint,0),
      coalesce((v_record->>'crewVoteTotal')::bigint,0),
      coalesce((v_record->>'crewVoteCorrect')::bigint,0),
      coalesce((v_record->>'crewVoteWrong')::bigint,0)
    )
    on conflict (game_id,player_id)
    do update set
      role = excluded.role,
      reports = greatest(public.records.reports,excluded.reports),
      self_reports = greatest(public.records.self_reports,excluded.self_reports),
      sabotage_count = greatest(public.records.sabotage_count,excluded.sabotage_count),
      sabotages = case
        when cardinality(excluded.sabotages) >= cardinality(public.records.sabotages)
          then excluded.sabotages
        else public.records.sabotages
      end,
      repair = greatest(coalesce(public.records.repair,0),coalesce(excluded.repair,0)),
      kills = case
        when cardinality(excluded.kills) >= cardinality(public.records.kills)
          then excluded.kills
        else public.records.kills
      end,
      death = case
        when public.records.death is null or public.records.death = 'Survit'
          then excluded.death
        else public.records.death
      end,
      death_pos = coalesce(public.records.death_pos,excluded.death_pos),
      turn = coalesce(public.records.turn,excluded.turn),
      tasks = case
        when public.records.tasks is null then excluded.tasks
        when excluded.tasks is null then public.records.tasks
        else greatest(public.records.tasks,excluded.tasks)
      end,
      total_tasks = case
        when public.records.total_tasks is null then excluded.total_tasks
        when excluded.total_tasks is null then public.records.total_tasks
        else greatest(public.records.total_tasks,excluded.total_tasks)
      end,
      ejected = public.records.ejected or excluded.ejected,
      note = case when btrim(public.records.note) <> '' then public.records.note else excluded.note end,
      vote_cast = greatest(public.records.vote_cast,excluded.vote_cast),
      vote_player = greatest(public.records.vote_player,excluded.vote_player),
      vote_impostor = greatest(public.records.vote_impostor,excluded.vote_impostor),
      vote_crew = greatest(public.records.vote_crew,excluded.vote_crew),
      vote_skip = greatest(public.records.vote_skip,excluded.vote_skip),
      vote_no_vote = greatest(public.records.vote_no_vote,excluded.vote_no_vote),
      vote_self = greatest(public.records.vote_self,excluded.vote_self),
      crew_vote_total = greatest(public.records.crew_vote_total,excluded.crew_vote_total),
      crew_vote_correct = greatest(public.records.crew_vote_correct,excluded.crew_vote_correct),
      crew_vote_wrong = greatest(public.records.crew_vote_wrong,excluded.crew_vote_wrong),
      updated_at = now();
  end loop;

  return v_game_id;
end;
$$;

revoke all on function public.admin_import_logger_game(uuid,text,text,text,text,bigint,text,text,text,bigint,timestamptz,text,text[],text,text[],jsonb,jsonb) from public, anon;
grant execute on function public.admin_import_logger_game(uuid,text,text,text,text,bigint,text,text,text,bigint,timestamptz,text,text[],text,text[],jsonb,jsonb) to authenticated;
