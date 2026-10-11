-- Crew'mong Us — keep raw GameLogger JSON private to Admins.

create table if not exists public.logger_imports (
  game_id uuid primary key
    references public.games(id)
    on delete cascade,
  raw_log jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.logger_imports enable row level security;

revoke all on table public.logger_imports from anon, authenticated;
grant select on table public.logger_imports to authenticated;

drop policy if exists "Admins can read logger imports" on public.logger_imports;
create policy "Admins can read logger imports"
  on public.logger_imports for select
  to authenticated
  using ((select private.has_role('admin')));

insert into public.logger_imports(game_id, raw_log)
select id, raw_log
from public.games
where raw_log is not null
on conflict (game_id)
do update set raw_log = excluded.raw_log, updated_at = now();

alter table public.games
  drop column if exists raw_log;

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
  if not (select private.has_role('admin')) then raise exception 'Accès refusé'; end if;
  if p_session_id is null or p_session_id !~ '^\d{4}-\d{2}-\d{2}$' then raise exception 'Session invalide'; end if;
  if p_winner not in ('Imposteurs','Crewmates') then raise exception 'Camp gagnant invalide'; end if;

  insert into public.sessions(id,date_label,month,label)
  values (p_session_id,p_date_label,p_month,p_label)
  on conflict (id) do nothing;

  if p_existing_game_id is null then
    lock table public.games in share row exclusive mode;

    select count(*) into v_game_count
    from public.games
    where session_id = p_session_id;

    v_target_number := greatest(1,least(coalesce(p_game_number,v_game_count+1),v_game_count+1));

    update public.games
    set game_number=-game_number
    where session_id=p_session_id and game_number>=v_target_number;

    update public.games
    set game_number=(-game_number)+1
    where session_id=p_session_id and game_number<0;

    insert into public.games(
      session_id,game_number,map,winner,method,t1_deaths,
      started_at,fingerprint,fingerprints,logger_version,sources
    )
    values (
      p_session_id,v_target_number,p_map,p_winner,p_method,coalesce(p_t1_deaths,0),
      p_started_at,nullif(p_fingerprint,''),coalesce(p_fingerprints,'{}'::text[]),
      coalesce(p_logger_version,''),coalesce(p_sources,'{}'::text[])
    )
    returning id into v_game_id;
  else
    select id into v_game_id
    from public.games
    where id=p_existing_game_id and session_id=p_session_id;

    if v_game_id is null then raise exception 'Game existante introuvable'; end if;

    update public.games
    set
      map=p_map,
      winner=p_winner,
      method=p_method,
      t1_deaths=coalesce(p_t1_deaths,0),
      started_at=coalesce(p_started_at,started_at),
      fingerprint=coalesce(nullif(p_fingerprint,''),fingerprint),
      fingerprints=coalesce(p_fingerprints,fingerprints),
      logger_version=coalesce(p_logger_version,logger_version),
      sources=coalesce(p_sources,sources)
    where id=v_game_id;
  end if;

  if p_raw_log is not null then
    insert into public.logger_imports(game_id,raw_log)
    values (v_game_id,p_raw_log)
    on conflict (game_id)
    do update set raw_log=excluded.raw_log, updated_at=now();
  end if;

  for v_record in
    select value
    from jsonb_array_elements(coalesce(p_records,'[]'::jsonb))
  loop
    v_name:=btrim(coalesce(v_record->>'name',''));
    if v_name='' then continue; end if;

    select id into v_player_id from public.players where name=v_name;

    if v_player_id is null then
      insert into public.players(name,handle,aliases,avatar_url,active,source)
      values(v_name,v_name,'{}'::text[],'',true,'admin')
      returning id into v_player_id;
    end if;

    insert into public.session_participants(session_id,player_id)
    values(p_session_id,v_player_id)
    on conflict(session_id,player_id) do nothing;

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
    values(
      v_game_id,v_player_id,v_record->>'role',
      coalesce((v_record->>'reports')::bigint,0),
      coalesce((v_record->>'self')::bigint,0),
      cardinality(v_sabotages),v_sabotages,
      coalesce((v_record->>'repair')::bigint,0),
      case when v_record->>'role'='Imposteur' then v_kills else '{}'::text[] end,
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
    on conflict(game_id,player_id) do update set
      role=excluded.role,
      reports=greatest(public.records.reports,excluded.reports),
      self_reports=greatest(public.records.self_reports,excluded.self_reports),
      sabotage_count=greatest(public.records.sabotage_count,excluded.sabotage_count),
      sabotages=case when cardinality(excluded.sabotages)>=cardinality(public.records.sabotages) then excluded.sabotages else public.records.sabotages end,
      repair=greatest(coalesce(public.records.repair,0),coalesce(excluded.repair,0)),
      kills=case when cardinality(excluded.kills)>=cardinality(public.records.kills) then excluded.kills else public.records.kills end,
      death=case when public.records.death is null or public.records.death='Survit' then excluded.death else public.records.death end,
      death_pos=coalesce(public.records.death_pos,excluded.death_pos),
      turn=coalesce(public.records.turn,excluded.turn),
      tasks=case when public.records.tasks is null then excluded.tasks when excluded.tasks is null then public.records.tasks else greatest(public.records.tasks,excluded.tasks) end,
      total_tasks=case when public.records.total_tasks is null then excluded.total_tasks when excluded.total_tasks is null then public.records.total_tasks else greatest(public.records.total_tasks,excluded.total_tasks) end,
      ejected=public.records.ejected or excluded.ejected,
      note=case when btrim(public.records.note)<>'' then public.records.note else excluded.note end,
      vote_cast=greatest(public.records.vote_cast,excluded.vote_cast),
      vote_player=greatest(public.records.vote_player,excluded.vote_player),
      vote_impostor=greatest(public.records.vote_impostor,excluded.vote_impostor),
      vote_crew=greatest(public.records.vote_crew,excluded.vote_crew),
      vote_skip=greatest(public.records.vote_skip,excluded.vote_skip),
      vote_no_vote=greatest(public.records.vote_no_vote,excluded.vote_no_vote),
      vote_self=greatest(public.records.vote_self,excluded.vote_self),
      crew_vote_total=greatest(public.records.crew_vote_total,excluded.crew_vote_total),
      crew_vote_correct=greatest(public.records.crew_vote_correct,excluded.crew_vote_correct),
      crew_vote_wrong=greatest(public.records.crew_vote_wrong,excluded.crew_vote_wrong),
      updated_at=now();
  end loop;

  return v_game_id;
end;
$$;

revoke all on function public.admin_import_logger_game(uuid,text,text,text,text,bigint,text,text,text,bigint,timestamptz,text,text[],text,text[],jsonb,jsonb) from public, anon;
grant execute on function public.admin_import_logger_game(uuid,text,text,text,text,bigint,text,text,text,bigint,timestamptz,text,text[],text,text[],jsonb,jsonb) to authenticated;
