const PLAYERS=[
{name:"Meteorann",handle:"meteorann"},{name:"DeadelusTV",handle:"deadelustv"},{name:"MrClegane",handle:"mrclegane"},
{name:"Pwatrinn",handle:"pwatrinn"},{name:"RC_Imperator",handle:"rc_imperator"},{name:"Bunny_Island",handle:"_bunny_island_"},
{name:"AnsyTV",handle:"ansytv"},{name:"MiguelAngelo_TV",handle:"_miguelangelo"},{name:"Psyster",handle:"psyster"},{name:"Jerlapive",handle:"jerlapive"}
];
const SEED_SESSIONS={"2026-09-28":{date:"28 septembre 2026",month:"2026-09",label:"28/09/2026"}};
const SEED_GAMES=[
{session:"2026-09-28",n:1,map:"The Fungle",winner:"Imposteurs",method:"Kills",t1Deaths:3},
{session:"2026-09-28",n:2,map:"Polus",winner:"Imposteurs",method:"Kills",t1Deaths:1},
{session:"2026-09-28",n:3,map:"Polus",winner:"Crewmates",method:"Votes",t1Deaths:1},
{session:"2026-09-28",n:4,map:"MIRA HQ",winner:"Imposteurs",method:"Sabotage",t1Deaths:1},
{session:"2026-09-28",n:5,map:"Polus",winner:"Imposteurs",method:"Kills",t1Deaths:1},
{session:"2026-09-28",n:6,map:"Polus",winner:"Imposteurs",method:"Sabotage",t1Deaths:1},
{session:"2026-09-28",n:7,map:"Polus",winner:"Imposteurs",method:"Votes",t1Deaths:2},
{session:"2026-09-28",n:8,map:"Polus",winner:"Imposteurs",method:"Kills",t1Deaths:2}
];
const SEED_RECORDS=[
{session:"2026-09-28",p:"Bunny_Island",g:1,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:0,death:"Tuée par Pwatrinn",deathPos:6,turn:3,tasks:3,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:2,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tuée par Psyster",deathPos:2,turn:2,tasks:9,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:3,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Survit",deathPos:null,turn:null,tasks:6,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:4,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Survit",deathPos:null,turn:null,tasks:7,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:5,role:"Imposteur",reports:0,self:0,sab:0,sabotages:[],repair:0,kills:["MrClegane","MiguelAngelo_TV","DeadelusTV"],death:"Survit",turn:null,tasks:null,totalTasks:null,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:6,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tuée par RC_Imperator",deathPos:6,turn:3,tasks:6,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:7,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tuée par Psyster",deathPos:1,turn:1,tasks:8,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Bunny_Island",g:8,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tuée par RC_Imperator",deathPos:2,turn:1,tasks:9,totalTasks:9,ejected:false,note:""},

{session:"2026-09-28",p:"RC_Imperator",g:1,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:1,death:"Tué par Pwatrinn",deathPos:7,turn:3,tasks:6,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"RC_Imperator",g:2,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:0,death:"Éjecté au conseil",deathPos:null,turn:null,tasks:9,totalTasks:9,ejected:true,note:"Éjecté 4e"},
{session:"2026-09-28",p:"RC_Imperator",g:3,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:2,death:"Tué par MiguelAngelo_TV",deathPos:3,turn:2,tasks:3,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"RC_Imperator",g:4,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:1,death:"Tué par DeadelusTV",deathPos:4,turn:3,tasks:4,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"RC_Imperator",g:5,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Éjecté au conseil",deathPos:null,turn:null,tasks:6,totalTasks:9,ejected:true,note:"Éjecté 3e"},
{session:"2026-09-28",p:"RC_Imperator",g:6,role:"Imposteur",reports:0,self:0,sab:5,sabotages:["Radio / Sismique","Radio / Sismique","Radio / Sismique","Radio / Sismique","Radio / Sismique"],repair:0,kills:["DeadelusTV","MiguelAngelo_TV","Pwatrinn","Jerlapive","Bunny_Island"],death:"Survit",turn:null,tasks:null,totalTasks:null,ejected:false,note:""},
{session:"2026-09-28",p:"RC_Imperator",g:7,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:0,death:"Survit",deathPos:null,turn:null,tasks:5,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"RC_Imperator",g:8,role:"Imposteur",reports:0,self:0,sab:5,sabotages:["Radio / Sismique","Radio / Sismique","Radio / Sismique","Radio / Sismique","Radio / Sismique"],repair:0,kills:["Pwatrinn","Bunny_Island","Meteorann","MiguelAngelo_TV"],death:"Éjecté au conseil",turn:null,tasks:null,totalTasks:null,ejected:true,note:"Éliminé 2e"},

{session:"2026-09-28",p:"Meteorann",g:1,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tué par MiguelAngelo_TV",deathPos:4,turn:2,tasks:6,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Meteorann",g:2,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tué par AnsyTV",deathPos:3,turn:2,tasks:9,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Meteorann",g:3,role:"Crew",reports:2,self:0,sab:0,sabotages:[],repair:2,death:"Tué par MiguelAngelo_TV",deathPos:5,turn:4,tasks:9,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Meteorann",g:4,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tué par DeadelusTV",deathPos:1,turn:1,tasks:8,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Meteorann",g:5,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tué par Pwatrinn",deathPos:3,turn:2,tasks:6,totalTasks:9,ejected:false,note:""},
{session:"2026-09-28",p:"Meteorann",g:6,role:"Imposteur",reports:1,self:0,sab:3,sabotages:["Portes","Portes","Portes"],repair:0,kills:["MrClegane"],death:"Éjecté au conseil",turn:null,tasks:null,totalTasks:null,ejected:true,note:"Éliminé 3e"},
{session:"2026-09-28",p:"Meteorann",g:7,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Éjecté au conseil",deathPos:null,turn:null,tasks:7,totalTasks:9,ejected:true,note:"Éjecté 2e conseil"},
{session:"2026-09-28",p:"Meteorann",g:8,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:0,death:"Tué par RC_Imperator",deathPos:3,turn:2,tasks:9,totalTasks:9,ejected:false,note:""},

{session:"2026-09-28",p:"AnsyTV",g:1,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:null,death:"Tuée par Pwatrinn",deathPos:5,turn:2,tasks:2,totalTasks:9,ejected:false,note:"Réparations non renseignées"},
{session:"2026-09-28",p:"AnsyTV",g:2,role:"Imposteur",reports:0,self:0,sab:3,sabotages:[],repair:0,kills:["Meteorann","MiguelAngelo_TV"],death:"Survit",turn:null,tasks:null,totalTasks:null,ejected:false,note:"Sabotages détaillés non renseignés"},
{session:"2026-09-28",p:"AnsyTV",g:3,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:null,death:"Tuée par MrClegane",deathPos:1,turn:1,tasks:5,totalTasks:9,ejected:false,note:"Réparations non renseignées"},
{session:"2026-09-28",p:"AnsyTV",g:4,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:null,death:"Survit",deathPos:null,turn:null,tasks:4,totalTasks:9,ejected:false,note:"Réparations non renseignées"},
{session:"2026-09-28",p:"AnsyTV",g:5,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:null,death:"Tuée par Pwatrinn",deathPos:5,turn:3,tasks:5,totalTasks:9,ejected:false,note:"Réparations non renseignées"},
{session:"2026-09-28",p:"AnsyTV",g:6,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:null,death:"Survit",deathPos:null,turn:null,tasks:6,totalTasks:9,ejected:false,note:"Réparations non renseignées"},
{session:"2026-09-28",p:"AnsyTV",g:7,role:"Crew",reports:0,self:0,sab:0,sabotages:[],repair:null,death:"Tuée par MiguelAngelo_TV",deathPos:2,turn:1,tasks:8,totalTasks:9,ejected:false,note:"Réparations non renseignées"},
{session:"2026-09-28",p:"AnsyTV",g:8,role:"Crew",reports:1,self:0,sab:0,sabotages:[],repair:null,death:"Tuée par MrClegane",deathPos:6,turn:3,tasks:7,totalTasks:9,ejected:false,note:"Réparations non renseignées"}
];
const SABOTAGE_TYPES=["Oxygène","Réacteur","Lumières","Radio","Sismiques","Portes","Champignon"];
const RECORD_STORAGE="crewmongus-v6-records",GAME_STORAGE="crewmongus-v6-games",PARTICIPANT_STORAGE="crewmongus-v6-session-participants",SESSION_STORAGE="crewmongus-v6-sessions",DELETED_SESSION_STORAGE="crewmongus-v6-deleted-sessions";
let DELETED_SESSIONS=new Set(loadJson(DELETED_SESSION_STORAGE,[]));
let SESSIONS=loadJson(SESSION_STORAGE,SEED_SESSIONS);
const DEFAULT_SESSION_PARTICIPANTS=Object.fromEntries(Object.keys(SESSIONS).map(id=>[id,[]]));
let RECORDS=loadJson(RECORD_STORAGE,SEED_RECORDS),GAMES=loadJson(GAME_STORAGE,SEED_GAMES),SESSION_PARTICIPANTS=loadJson(PARTICIPANT_STORAGE,DEFAULT_SESSION_PARTICIPANTS);
purgeDeletedSessions();
let currentScope=latestMonth(),currentPlayer="Bunny_Island",currentPlayerMonth=latestMonth(),currentPlayerMode="month",editingRecordKey=null;

function loadJson(key,seed){try{const v=localStorage.getItem(key);return v?JSON.parse(v):structuredClone(seed)}catch{return structuredClone(seed)}}
function purgeDeletedSessions(){
 DELETED_SESSIONS.forEach(id=>{delete SESSIONS[id];delete SESSION_PARTICIPANTS[id]});
 GAMES=GAMES.filter(g=>!DELETED_SESSIONS.has(g.session));
 RECORDS=RECORDS.filter(r=>!DELETED_SESSIONS.has(r.session));
}
function saveAll(){try{purgeDeletedSessions();localStorage.setItem(RECORD_STORAGE,JSON.stringify(RECORDS));localStorage.setItem(GAME_STORAGE,JSON.stringify(GAMES));localStorage.setItem(PARTICIPANT_STORAGE,JSON.stringify(SESSION_PARTICIPANTS));localStorage.setItem(SESSION_STORAGE,JSON.stringify(SESSIONS));localStorage.setItem(DELETED_SESSION_STORAGE,JSON.stringify([...DELETED_SESSIONS]))}catch{}}
function sessionIds(){return Object.keys(SESSIONS).sort((a,b)=>b.localeCompare(a))}
function availableMonths(){return [...new Set(sessionIds().map(id=>SESSIONS[id]?.month).filter(Boolean))].sort((a,b)=>b.localeCompare(a))}
function latestMonth(){return availableMonths()[0]||"2026-09"}
function monthLabel(ym){const [y,m]=String(ym).split("-").map(Number);if(!y||!m)return ym;return new Intl.DateTimeFormat("fr-FR",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(y,m-1,1))).replace(/^./,c=>c.toUpperCase())}
function sessionMetaFromId(id){const [y,m,d]=id.split("-").map(Number),date=new Date(Date.UTC(y,m-1,d));return{date:new Intl.DateTimeFormat("fr-FR",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(date),month:id.slice(0,7),label:String(d).padStart(2,"0")+"/"+String(m).padStart(2,"0")+"/"+y}}
function refreshSessionSelectors(){
 const months=availableMonths(),ids=sessionIds();
 const period=document.getElementById("period-select"),periodValue=currentScope==="all"?"all":(months.includes(currentScope)?currentScope:(months[0]||"all"));
 period.innerHTML=months.map(m=>`<option value="${esc(m)}">${esc(monthLabel(m))}</option>`).join("")+`<option value="all">Stats globales</option>`;period.value=periodValue;currentScope=periodValue;
 const sessionMonth=document.getElementById("session-month"),oldSessionMonth=sessionMonth.value;
 sessionMonth.innerHTML=months.map(m=>`<option value="${esc(m)}">${esc(monthLabel(m))}</option>`).join("");sessionMonth.value=months.includes(oldSessionMonth)?oldSessionMonth:(months[0]||"");
 const playerMonth=document.getElementById("player-month-select"),wantedPlayerMonth=months.includes(currentPlayerMonth)?currentPlayerMonth:(months[0]||"");
 playerMonth.innerHTML=months.map(m=>`<option value="${esc(m)}">${esc(monthLabel(m))}</option>`).join("");playerMonth.value=wantedPlayerMonth;currentPlayerMonth=wantedPlayerMonth;
 const formSession=document.getElementById("form-session"),oldForm=formSession.value;
 formSession.innerHTML=ids.map(id=>`<option value="${esc(id)}">${esc(SESSIONS[id]?.label||id)}</option>`).join("");formSession.value=ids.includes(oldForm)?oldForm:(ids[0]||"");
}
function sortedPlayers(){return [...PLAYERS].sort((a,b)=>a.name.localeCompare(b.name,"fr",{sensitivity:"base"}))}
function participantNamesForSession(session){const saved=SESSION_PARTICIPANTS[session];return Array.isArray(saved)?saved:[]}
function participantsForSession(session){const allowed=new Set(participantNamesForSession(session));return sortedPlayers().filter(p=>allowed.has(p.name))}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function pct(n,d){return d?(n/d*100).toFixed(1).replace(".",",")+" %":"0 %"}
function gameFor(r){return GAMES.find(g=>g.session===r.session&&g.n===r.g)}
function resultFor(r){const g=gameFor(r);return g&&((r.role==="Imposteur"&&g.winner==="Imposteurs")||(r.role==="Crew"&&g.winner==="Crewmates"))?"Victoire":"Défaite"}
function gamesForScope(s){return s==="all"?[...GAMES]:GAMES.filter(g=>SESSIONS[g.session]?.month===s)}
function recordsForScope(s){return s==="all"?[...RECORDS]:RECORDS.filter(r=>SESSIONS[r.session]?.month===s)}
function favoriteFromList(list){const c={};(list||[]).filter(Boolean).forEach(s=>c[s]=(c[s]||0)+1);const vals=Object.values(c),max=vals.length?Math.max(...vals):0;if(!max)return null;const names=Object.entries(c).filter(([,n])=>n===max).map(([s])=>s);return{name:names.join(" / "),count:max}}
function favoriteSabotage(records){return favoriteFromList(records.flatMap(r=>r.sabotages||[]))}
function turnNumber(v){if(!v)return null;const m=String(v).match(/T(\d+)/);return m?Number(m[1]):null}

function icon(name){
 const paths={
 crown:'<path d="M3 7l4 4 5-7 5 7 4-4-2 11H5L3 7z"/><path d="M6 21h12"/>',
 star:'<path d="m12 2 3 6 7 .8-5 4.7 1.5 6.5L12 17l-6.5 3 1.5-6.5-5-4.7L9 8z"/>',
 medal:'<circle cx="12" cy="9" r="5"/><path d="M9 14 7 22l5-3 5 3-2-8"/>',
 users:'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21c0-4 2-7 6-7s6 3 6 7M14 15c4 0 7 2 8 6"/>',
 shield:'<path d="M12 3 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6z"/><path d="m9 12 2 2 4-5"/>',
 infinity:'<path d="M7 8c-3 0-5 2-5 4s2 4 5 4c4 0 6-8 10-8 3 0 5 2 5 4s-2 4-5 4c-4 0-6-8-10-8z"/>',
 cone:'<path d="M8 20h8L13 4h-2z"/><path d="M5 20h14M9 14h6"/>',
 eject:'<path d="M5 12h13"/><path d="m14 8 4 4-4 4"/><path d="M4 5h4v14H4"/>',
 x:'<path d="M5 5l14 14M19 5 5 19"/>',
 skull:'<circle cx="12" cy="10" r="7"/><path d="M9 10h.01M15 10h.01M9 16v4M12 17v3M15 16v4"/>',
 fast:'<path d="m3 6 7 6-7 6zM11 6l7 6-7 6zM20 6v12"/>',
 megaphone:'<path d="M3 11v2l11 4V7z"/><path d="M14 9h4l3-3v12l-3-3h-4M7 15l1 5h3"/>',
 sad:'<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01M8 17c2-3 6-3 8 0"/>',
 chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/>',
 crowd:'<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7 21v-4c0-3 2-5 5-5s5 2 5 5v4M1 21v-3c0-2 1-4 4-4M23 21v-3c0-2-1-4-4-4"/>',
 wrench:'<path d="M14 6a5 5 0 0 0-6 6L3 17l4 4 5-5a5 5 0 0 0 6-6l-3 3-4-4z"/>',
 bolt:'<path d="M13 2 4 14h7l-1 8 9-13h-7z"/>',
 map:'<path d="M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
 duo:'<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2 21c0-4 2-7 6-7 2 0 3 .6 4 1.6M22 21c0-4-2-7-6-7-2 0-3 .6-4 1.6"/>',
 repair:'<path d="M14 6a5 5 0 0 0-6 6L3 17l4 4 5-5a5 5 0 0 0 6-6l-3 3-4-4z"/>',
 ghost:'<path d="M5 21V10a7 7 0 0 1 14 0v11l-3-2-2 2-2-2-2 2-2-2z"/><path d="M9 10h.01M15 10h.01"/>'
 };
 return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.star}</svg>`;
}
function vrow(label,value,detail,icoName){return `<div class="vrow"><span class="ico">${icon(icoName)}</span><div><span class="vlabel">${esc(label)}</span><small>${esc(detail||"")}</small></div><strong>${esc(value)}</strong></div>`}
function t1row(label,name,stat){return `<div class="t1mini"><div class="t1copy"><b class="t1label">${esc(label)}</b><strong class="t1name">${esc(name)}</strong><small class="t1stat">${esc(stat)}</small></div></div>`}
function mentionRow(label,value,detail){return `<div class="mention-row"><div class="mention-copy"><b class="mention-label">${esc(label)}</b><small class="mention-detail">${esc(detail)}</small></div><strong class="mention-value">${esc(value)}</strong></div>`}

/* navigation */
document.querySelectorAll(".nav").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.getElementById("view-"+b.dataset.view).classList.add("active");if(b.dataset.view==="admin")renderAdmin()}));
document.getElementById("period-select").addEventListener("change",e=>{currentScope=e.target.value;renderStats()});
document.getElementById("session-month").addEventListener("change",renderSessions);
document.getElementById("player-month-select").addEventListener("change",e=>{currentPlayerMonth=e.target.value;currentPlayerMode="month";renderPlayerTabs();renderPlayer()});

function renderStats(){
 const games=gamesForScope(currentScope),recs=recordsForScope(currentScope),all=currentScope==="all";
 document.getElementById("scope-kicker").textContent=all?"STATS GLOBALES":"STATS DU MOIS";
 document.getElementById("scope-title").textContent=all?"Toutes périodes":monthLabel(currentScope);
 document.getElementById("scope-subtitle").textContent=all?"Toutes les sessions enregistrées.":"Toutes les sessions enregistrées pendant le mois.";
 const iw=games.filter(g=>g.winner==="Imposteurs"),cw=games.filter(g=>g.winner==="Crewmates");
 document.getElementById("impo-win-count").textContent=iw.length;document.getElementById("impo-win-pct").textContent=pct(iw.length,games.length);
 document.getElementById("crew-win-count").textContent=cw.length;document.getElementById("crew-win-pct").textContent=pct(cw.length,games.length);
 document.getElementById("impo-bar").style.width=(games.length?iw.length/games.length*100:0)+"%";document.getElementById("crew-bar").style.width=(games.length?cw.length/games.length*100:0)+"%";
 const im=["Kills","Votes","Sabotage"].map(m=>[m,iw.filter(g=>g.method===m).length]);
 const cr=[["Quêtes",cw.filter(g=>g.method==="Quêtes").length],["Votes",cw.filter(g=>g.method==="Votes").length]];
 document.getElementById("impo-methods").innerHTML=im.map(([m,n])=>`<b>${m}</b> ${n} (${pct(n,iw.length)})`).join(" • ");
 document.getElementById("crew-methods").innerHTML=`<b>Quêtes</b> ${cr[0][1]} (${pct(cr[0][1],cw.length)}) • <b>Élimination</b> ${cr[1][1]} (${pct(cr[1][1],cw.length)})`;

 const tracked=sortedPlayers().map(p=>{const rr=recs.filter(r=>r.p===p.name),imp=rr.filter(r=>r.role==="Imposteur"),crew=rr.filter(r=>r.role==="Crew");return{name:p.name,rr,imp,crew,impWins:imp.filter(r=>resultFor(r)==="Victoire").length,crewWins:crew.filter(r=>resultFor(r)==="Victoire").length,impEjected:imp.filter(r=>r.ejected).length,crewEjected:crew.filter(r=>r.ejected).length,kills:rr.reduce((a,r)=>a+(r.kills?.length||0),0),maxKills:Math.max(0,...rr.map(r=>r.kills?.length||0)),t1:crew.filter(r=>r.turn===1).length,firstDeath:crew.filter(r=>r.deathPos===1).length,repairs:crew.reduce((a,r)=>a+(Number.isFinite(r.repair)?r.repair:0),0)}}).filter(x=>x.rr.length);
 if(!tracked.length){document.getElementById("hall").innerHTML="";document.getElementById("shame").innerHTML="";document.getElementById("t1-rows").innerHTML="";document.getElementById("mentions").innerHTML="";document.getElementById("t1-average").textContent="0 Crewmate";return}
 const impP=tracked.filter(x=>x.imp.length),crewP=tracked.filter(x=>x.crew.length);
 const maxIR=Math.max(...impP.map(x=>x.impWins/x.imp.length)),iaot=impP.filter(x=>x.impWins/x.imp.length===maxIR),mostIW=[...impP].sort((a,b)=>b.impWins-a.impWins)[0];
 const maxCR=Math.max(...crewP.map(x=>x.crewWins/x.crew.length)),bestC=crewP.filter(x=>x.crewWins/x.crew.length===maxCR),mostIG=[...tracked].sort((a,b)=>b.imp.length-a.imp.length)[0];
 const maxCS=Math.max(...tracked.map(x=>x.crew.length/x.rr.length)),career=tracked.filter(x=>x.crew.length/x.rr.length===maxCS),never=impP.filter(x=>x.impEjected===0);
 document.getElementById("hall").innerHTML=[
 vrow(all?"IAOT — Impo of all time":"Imposteur du mois",iaot.map(x=>x.name).join(", "),`${pct(maxIR,1)} de victoires Imposteur`,"crown"),
 vrow("Le plus de victoires en Imposteur",mostIW.name,`${mostIW.impWins} victoires • ${pct(mostIW.impWins,mostIW.imp.length)}`,"star"),
 vrow("Meilleur taux de victoire Crew",bestC.map(x=>x.name).join(", "),`${pct(maxCR,1)} • ${bestC.map(x=>`${x.crewWins}/${x.crew.length}`).join(" • ")}`,"medal"),
 vrow("Le plus de fois Imposteur",mostIG.name,`${pct(mostIG.imp.length,mostIG.rr.length)} • ${mostIG.imp.length}/${mostIG.rr.length} games`,"users"),
 vrow("Le Crewmate de carrière",career.map(x=>x.name).join(", "),`${pct(maxCS,1)} Crew • ${career[0].crew.length}/${career[0].rr.length} games`,"shield"),
 vrow("Imposteur jamais éjecté",never.map(x=>x.name).join(", "),never.map(x=>`0/${x.imp.length}`).join(" • "),"infinity")
 ].join("");

 const zero=impP.filter(x=>x.impWins===0),sas=impP.filter(x=>x.impEjected===x.imp.length),maxER=Math.max(...impP.map(x=>x.impEjected/x.imp.length)),mostE=impP.filter(x=>x.impEjected/x.imp.length===maxER);
 const maxT1=Math.max(...tracked.map(x=>x.t1)),ghost=tracked.filter(x=>x.t1===maxT1),maxFR=Math.max(...crewP.map(x=>x.firstDeath/x.crew.length)),express=crewP.filter(x=>x.firstDeath/x.crew.length===maxFR),maxCE=Math.max(...tracked.map(x=>x.crewEjected)),sus=tracked.filter(x=>x.crewEjected===maxCE&&maxCE>0),noCW=crewP.filter(x=>x.crewWins===0);
 document.getElementById("shame").innerHTML=[
 vrow("Impo en période d’essai",zero.length?zero.map(x=>x.name).join(", "):"Personne",zero.length?zero.map(x=>`0/${x.imp.length}`).join(" • "):"Aucun joueur concerné","cone"),
 vrow("Abonné au SAS",sas.length?sas.map(x=>x.name).join(", "):"Personne",sas.length?"100% éjecté en imposteur":"","eject"),
 vrow("VIP du SAS",mostE.map(x=>x.name).join(", "),`${mostE[0].impEjected}/${mostE[0].imp.length} • ${pct(maxER,1)}`,"x"),
 vrow("Fantôme ultime",ghost.map(x=>x.name).join(", "),`Mort en T1 ${maxT1} fois`,"ghost"),
 vrow("Le départ express",express.map(x=>x.name).join(", "),`Mort en premier ${express[0].firstDeath} fois • ${pct(maxFR,1)}`,"fast"),
 vrow("Accusé idéal",sus.length?sus.map(x=>x.name).join(", "):"Personne",sus.length?`${maxCE} éjection(s) en Crew`:"","megaphone"),
 vrow("Soirée noire",noCW.length?noCW.map(x=>x.name).join(", "):"Personne",noCW.length?"0 victoire Crew":"Aucun joueur concerné","sad")
 ].join("");

 const avgT1=games.length?games.reduce((a,g)=>a+(g.t1Deaths||0),0)/games.length:0,maxDeaths=Math.max(0,...games.map(g=>g.t1Deaths||0)),maxTimes=games.filter(g=>(g.t1Deaths||0)===maxDeaths).length;
 document.getElementById("t1-average").textContent=`${avgT1.toFixed(2).replace(".",",")} Crewmate${avgT1>1?"s":""}`;
 const maxRisk=Math.max(...crewP.map(x=>x.t1/x.crew.length)),risk=crewP.filter(x=>x.t1/x.crew.length===maxRisk),noT1=crewP.filter(x=>x.t1===0);
 document.getElementById("t1-rows").innerHTML=[
 t1row("Mort le plus souvent",ghost.map(x=>x.name).join(", "),`${maxT1} fois`),
 t1row("Plus grand risque",risk.map(x=>x.name).join(", "),`${pct(maxRisk,1)} • ${risk[0].t1}/${risk[0].crew.length} games Crew`),
 t1row("Maximum de morts",`${maxDeaths} morts`,`Record atteint ${maxTimes} fois`),
 t1row("Aucun décès T1",noT1.length?noT1.map(x=>x.name).join(", "):"Personne",noT1.length?noT1.map(x=>`0/${x.crew.length}`).join(" • "):"")
 ].join("");

 const topKG=Math.max(...tracked.map(x=>x.maxKills)),topK=tracked.filter(x=>x.maxKills===topKG),bestRepair=Math.max(...tracked.map(x=>x.repairs)),repairers=tracked.filter(x=>x.repairs===bestRepair),favSab=favoriteSabotage(recs.filter(r=>r.role==="Imposteur"));
 const mapStats={};games.forEach(g=>{mapStats[g.map]??={total:0,imp:0,crew:0};mapStats[g.map].total++;g.winner==="Imposteurs"?mapStats[g.map].imp++:mapStats[g.map].crew++});
 const bestIM=Math.max(...Object.values(mapStats).map(x=>x.imp/x.total)),impMaps=Object.entries(mapStats).filter(([,x])=>x.imp/x.total===bestIM),bestCM=Math.max(...Object.values(mapStats).map(x=>x.crew/x.total)),crewMaps=Object.entries(mapStats).filter(([,x])=>x.crew/x.total===bestCM);
 document.getElementById("mentions").innerHTML=[
 mentionRow("Record de nombre de kills",topK.map(x=>x.name).join(", "),`${topKG} kills dans une game`),
 mentionRow("Meilleur réparateur",repairers.map(x=>x.name).join(", "),`${bestRepair} réparations au total`),
 mentionRow("Sabotage préféré des Imposteurs",favSab?favSab.name:"Non renseigné",favSab?`${favSab.count} utilisations détaillées`:""),
 mentionRow("Map préférée des Imposteurs",impMaps.map(([m])=>m).join(" & "),`${pct(bestIM,1)} de victoires`),
 mentionRow("Map la plus favorable au Crew",crewMaps.map(([m])=>m).join(" & "),`${pct(bestCM,1)} de victoires`)
 ].join("");
}

function renderSessions(){
 const month=document.getElementById("session-month").value,cards=document.getElementById("session-cards"),entries=Object.entries(SESSIONS).filter(([,s])=>s.month===month).sort((a,b)=>b[0].localeCompare(a[0]));
 cards.innerHTML=entries.map(([id,s],i)=>`<button class="session-card ${i===0?"active":""}" data-id="${id}"><h3>${esc(s.date)}</h3><p>${GAMES.filter(g=>g.session===id).length} games enregistrées</p></button>`).join("");
 cards.querySelectorAll(".session-card").forEach(b=>b.addEventListener("click",()=>{cards.querySelectorAll(".session-card").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderSession(b.dataset.id)}));if(entries.length)renderSession(entries[0][0]);
}
function renderSession(id){const s=SESSIONS[id],games=GAMES.filter(g=>g.session===id).sort((a,b)=>a.n-b.n),iw=games.filter(g=>g.winner==="Imposteurs").length,cw=games.length-iw;document.getElementById("session-title").textContent=s.date;document.getElementById("session-summary").innerHTML=[["Games",games.length],["Wins Imposteurs",iw],["Wins Crew",cw],["Morts T1 / game",games.length?(games.reduce((a,g)=>a+(g.t1Deaths||0),0)/games.length).toFixed(2).replace(".",","):"0"],["Map la + jouée",mostCommon(games.map(g=>g.map))||"—"]].map(([a,b])=>`<div class="card"><span>${esc(a)}</span><strong>${esc(String(b))}</strong></div>`).join("");document.getElementById("session-games").innerHTML=games.map(g=>`<tr><td>${g.n}</td><td>${esc(g.map)}</td><td>${esc(g.winner)}</td><td>${esc(g.method)}</td><td>${g.t1Deaths||0}</td></tr>`).join("")}
function mostCommon(arr){const c={};arr.forEach(v=>c[v]=(c[v]||0)+1);return Object.entries(c).sort((a,b)=>b[1]-a[1])[0]?.[0]}

function renderPlayerList(){const box=document.getElementById("player-list");box.innerHTML=sortedPlayers().map(p=>{const has=RECORDS.some(r=>r.p===p.name);return `<button class="player-btn ${p.name===currentPlayer?"active":""}" data-p="${esc(p.name)}">${esc(p.name)}<span>@${esc(p.handle)}${has?" • données":" • aucune grille"}</span></button>`}).join("");box.querySelectorAll(".player-btn").forEach(b=>b.addEventListener("click",()=>{currentPlayer=b.dataset.p;currentPlayerMonth=latestMonth();currentPlayerMode="month";renderPlayerList();syncPlayerMonth();renderPlayerTabs();renderPlayer()}))}
function syncPlayerMonth(){document.getElementById("player-month-select").value=currentPlayerMonth}
function renderPlayerTabs(){const all=RECORDS.filter(r=>r.p===currentPlayer),ids=[...new Set(all.filter(r=>SESSIONS[r.session]?.month===currentPlayerMonth).map(r=>r.session))].sort((a,b)=>b.localeCompare(a)),box=document.getElementById("player-session-tabs");box.innerHTML=`<button class="tab ${currentPlayerMode==="month"?"active":""}" data-mode="month">Cumul du mois</button>`+ids.map(id=>`<button class="tab ${currentPlayerMode===id?"active":""}" data-mode="${id}">${esc(SESSIONS[id].label)}</button>`).join("")+`<button class="tab ${currentPlayerMode==="all"?"active":""}" data-mode="all">Cumul global</button>`;box.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{currentPlayerMode=b.dataset.mode;renderPlayerTabs();renderPlayer()}))}
function renderPlayer(){
 const p=PLAYERS.find(x=>x.name===currentPlayer),all=RECORDS.filter(r=>r.p===currentPlayer);let rr=currentPlayerMode==="all"?all:currentPlayerMode==="month"?all.filter(r=>SESSIONS[r.session]?.month===currentPlayerMonth):all.filter(r=>r.session===currentPlayerMode);
 document.getElementById("p-name").textContent=p.name;const twitchLink=document.getElementById("p-handle");twitchLink.textContent="@"+p.handle+" ↗";twitchLink.href="https://www.twitch.tv/"+encodeURIComponent(p.handle);twitchLink.setAttribute("aria-label","Ouvrir la chaîne Twitch de "+p.name);document.getElementById("p-state").textContent=all.length?"Données présentes":"Aucune grille détaillée";
 if(!all.length){document.getElementById("p-summary").innerHTML=`<div class="card"><span>Statut</span><strong>Pas de données</strong></div>`;document.getElementById("p-stats").innerHTML=`<div class="kv-item"><span>Info</span><strong>Aucune grille fournie dans cette démo.</strong></div>`;document.getElementById("p-maps").innerHTML="";document.getElementById("p-sabotage").innerHTML="";document.getElementById("p-games").innerHTML="";return}
 const wins=rr.filter(r=>resultFor(r)==="Victoire").length,imp=rr.filter(r=>r.role==="Imposteur"),crew=rr.filter(r=>r.role==="Crew"),kills=rr.reduce((a,r)=>a+(r.kills?.length||0),0),reports=rr.reduce((a,r)=>a+(r.reports||0),0),repairs=crew.reduce((a,r)=>a+(Number.isFinite(r.repair)?r.repair:0),0),fav=favoriteSabotage(imp);
 document.getElementById("p-summary").innerHTML=[["Games",rr.length],["Victoires",wins],["Kills",kills],["Reports",reports],["Réparations",repairs]].map(([a,b])=>`<div class="card"><span>${a}</span><strong>${b}</strong></div>`).join("");
 document.getElementById("p-stats").innerHTML=[["Winrate global",pct(wins,rr.length)],["Winrate Crew",pct(crew.filter(r=>resultFor(r)==="Victoire").length,crew.length)],["Winrate Imposteur",pct(imp.filter(r=>resultFor(r)==="Victoire").length,imp.length)],["Part Crew",pct(crew.length,rr.length)],["Morts T1",crew.filter(r=>r.turn===1).length],["Éjections Crew",crew.filter(r=>r.ejected).length],["Éjections Imposteur",imp.filter(r=>r.ejected).length],["Sabotages",rr.reduce((a,r)=>a+(r.sab||0),0)]].map(([a,b])=>`<div class="kv-item"><span>${esc(a)}</span><strong>${esc(String(b))}</strong></div>`).join("");
 const maps={};rr.forEach(r=>{const g=gameFor(r);if(g)maps[g.map]=(maps[g.map]||0)+1});document.getElementById("p-maps").innerHTML=Object.entries(maps).map(([m,n])=>`<div class="map-row"><span>${esc(m)}</span><strong>${n}</strong></div>`).join("");document.getElementById("p-sabotage").innerHTML=`<span>Sabotage préféré</span><strong>${esc(fav?fav.name:(imp.some(r=>(r.sab||0)>0)?"Non renseigné":"Aucun"))}</strong>`;
 document.getElementById("p-games").innerHTML=rr.sort((a,b)=>a.g-b.g).map(r=>{const g=gameFor(r),kd=r.role==="Imposteur"?(r.kills?.join(" → ")||"Aucun kill"):r.death;return `<tr><td>${r.g}</td><td>${esc(g?.map||"—")}</td><td>${esc(r.role)}</td><td>${resultFor(r)}</td><td>${esc(g?.method||"—")}</td><td>${r.reports||0}</td><td>${r.self||0}</td><td>${r.sab||0}</td><td>${r.repair===null?"?":r.repair}</td><td>${esc(kd)}</td><td>${r.role==="Crew"&&r.deathPos?`${r.deathPos}${r.deathPos===1?"er":"e"}`:"—"}</td><td>${r.turn?`T${r.turn}`:"—"}</td><td>${r.tasks===null?"—":`${r.tasks}/${r.totalTasks||9}`}</td><td>${esc(r.note||"")}</td></tr>`}).join("")
}

function playerOptions(blank=false,session=null){const list=session?participantsForSession(session):sortedPlayers();return (blank?`<option value="">— Choisir —</option>`:"")+list.map(p=>`<option value="${esc(p.name)}">${esc(p.name)}</option>`).join("")}
function currentEntrySession(){return document.getElementById("form-session").value}
function syncEntryPlayerOptions(){const sel=document.getElementById("form-player"),old=sel.value;sel.innerHTML=playerOptions(false,currentEntrySession());if([...sel.options].some(o=>o.value===old))sel.value=old}
function refreshEventPlayerOptions(){const session=currentEntrySession();document.querySelectorAll("#events-list .event-row").forEach(row=>{const type=row.querySelector(".ev-type")?.value,sel=row.querySelector(".ev-target");if(!sel)return;const old=sel.value;let html="";if(type==="kill"||type==="death")html=playerOptions(true,session);if(type==="report"||type==="self")html=`<option value="">Non renseigné</option>${playerOptions(false,session)}`;if(type==="eject")html=`<option>Personne</option>${playerOptions(false,session)}`;if(html){sel.innerHTML=html;if([...sel.options].some(o=>o.value===old))sel.value=old}})}
function sabotageOptions(blank=false){return (blank?`<option value="">— Choisir —</option>`:"")+SABOTAGE_TYPES.map(s=>`<option>${esc(s)}</option>`).join("")}
function populateGameSelect(){const session=document.getElementById("form-session").value,sel=document.getElementById("form-game"),nums=[...new Set(GAMES.filter(g=>g.session===session).map(g=>g.n))].sort((a,b)=>a-b);sel.innerHTML=nums.map(n=>`<option value="${n}">${n}</option>`).join("");if(!nums.length)sel.innerHTML='<option value="1">1</option>'}
function initEntry(){syncEntryPlayerOptions();populateGameSelect();addEventRow();updateSabotageCount();syncWinnerFromResult();syncEntryRolePanels()}
function ensureSelectValue(sel,value,label=value){if(value===null||value===undefined||value==="")return;if(![...sel.options].some(o=>o.value===String(value)))sel.insertAdjacentHTML("beforeend",`<option value="${esc(value)}">${esc(label)}</option>`);sel.value=String(value)}
function eventTurnLabel(turn){return turn&&turn>=5?"T5+":`T${turn||1}`}
function addEventRow(data={}){const el=document.createElement("div");el.className="dynamic-row event-row";el.innerHTML=`<label>Tour<select class="ev-turn"><option>T1</option><option>T2</option><option>T3</option><option>T4</option><option>T5+</option></select></label><label>Type<select class="ev-type"><option value="kill">Kill du streamer</option><option value="death">Mort du streamer</option><option value="report">Report</option><option value="self">Self-report</option><option value="eject">Conseil / éjection</option></select></label><div class="dynamic-field"></div><button type="button" class="remove">×</button>`;document.getElementById("events-list").appendChild(el);el.querySelector(".ev-type").addEventListener("change",()=>renderEventDetail(el));el.querySelector(".remove").addEventListener("click",()=>el.remove());if(data.type)el.querySelector(".ev-type").value=data.type;el.querySelector(".ev-turn").value=eventTurnLabel(data.turn);renderEventDetail(el);const target=el.querySelector(".ev-target");if(target&&data.target){ensureSelectValue(target,data.target);target.value=data.target}const pos=el.querySelector(".ev-pos");if(pos&&data.pos)pos.value=String(data.pos)}
function renderEventDetail(el){const t=el.querySelector(".ev-type").value,b=el.querySelector(".dynamic-field");if(t==="kill")b.innerHTML=`<label>Victime<select class="ev-target">${playerOptions(true,currentEntrySession())}</select></label>`;if(t==="death")b.innerHTML=`<div class="two-cols"><label>Tué par<select class="ev-target">${playerOptions(true,currentEntrySession())}</select></label><label>Ordre de mort<input class="ev-pos" type="number" min="1" max="10" placeholder="1, 2, 3…"></label></div>`;if(t==="report")b.innerHTML=`<label>Corps reporté<select class="ev-target"><option value="">Non renseigné</option>${playerOptions(false,currentEntrySession())}</select></label>`;if(t==="self")b.innerHTML=`<label>Victime self-report<select class="ev-target"><option value="">Non renseigné</option>${playerOptions(false,currentEntrySession())}</select></label>`;if(t==="eject")b.innerHTML=`<label>Joueur éjecté<select class="ev-target"><option>Personne</option>${playerOptions(false,currentEntrySession())}</select></label>`}
function addSabotageRow(data={}){const r=document.createElement("div");r.className="dynamic-row sabotage-row";r.innerHTML=`<label>Tour<select class="sab-turn"><option>T1</option><option>T2</option><option>T3</option><option>T4</option><option>T5+</option></select></label><label>Sabotage<select class="sab-type">${sabotageOptions(false)}</select></label><button type="button" class="remove">×</button>`;document.getElementById("sabotages-list").appendChild(r);r.querySelector(".remove").addEventListener("click",()=>{r.remove();updateSabotageCount()});r.querySelector(".sab-type").addEventListener("change",updateFavoriteSuggestion);r.querySelector(".sab-turn").value=eventTurnLabel(data.turn);if(data.sabotage){const sel=r.querySelector(".sab-type");ensureSelectValue(sel,data.sabotage);sel.value=data.sabotage}updateSabotageCount()}
function updateSabotageCount(){const n=document.querySelectorAll("#sabotages-list .sabotage-row").length;document.getElementById("sabotage-count").textContent=`${n} sabotage${n>1?"s":""}`;updateFavoriteSuggestion()}
function updateFavoriteSuggestion(){const vals=[...document.querySelectorAll("#sabotages-list .sab-type")].map(x=>x.value),fav=favoriteFromList(vals),out=document.getElementById("favorite-sabotage-preview");if(out)out.textContent=fav?`${fav.name} (${fav.count})`:"Aucun"}
function syncEntryRolePanels(){const crew=document.getElementById("form-role").value==="Crew";document.getElementById("crew-repair-panel").hidden=!crew;document.getElementById("impostor-sabotage-panel").hidden=crew}
function changeRepair(delta){const input=document.getElementById("form-repairs"),next=Math.max(0,(Number(input.value)||0)+delta);input.value=String(next)}
function syncWinnerFromResult(){const role=document.getElementById("form-role").value,res=document.getElementById("form-result").value;document.getElementById("form-winning-side").value=(res==="Victoire")?(role==="Crew"?"Crewmates":"Imposteurs"):(role==="Crew"?"Imposteurs":"Crewmates")}
document.getElementById("form-role").addEventListener("change",()=>{syncWinnerFromResult();syncEntryRolePanels()});document.getElementById("form-result").addEventListener("change",syncWinnerFromResult);document.getElementById("add-event-btn").addEventListener("click",addEventRow);document.getElementById("add-sabotage-btn").addEventListener("click",addSabotageRow);document.getElementById("repair-minus").addEventListener("click",()=>changeRepair(-1));document.getElementById("repair-plus").addEventListener("click",()=>changeRepair(1));document.getElementById("form-session").addEventListener("change",()=>{populateGameSelect();syncEntryPlayerOptions();refreshEventPlayerOptions()});
document.getElementById("new-game-btn").addEventListener("click",()=>{editingRecordKey=null;document.getElementById("save-entry-btn").textContent="Enregistrer la fiche";const session=document.getElementById("form-session").value,nums=GAMES.filter(g=>g.session===session).map(g=>g.n),next=Math.max(0,...nums)+1,sel=document.getElementById("form-game");if(![...sel.options].some(o=>Number(o.value)===next))sel.insertAdjacentHTML("beforeend",`<option value="${next}">${next}</option>`);sel.value=String(next);document.getElementById("events-list").innerHTML="";document.getElementById("sabotages-list").innerHTML="";document.getElementById("form-repairs").value="0";addEventRow();updateSabotageCount();document.getElementById("entry-status").textContent=`Game ${next} prête à être saisie.`});

function editRecordFromAdmin(index){
 const r=RECORDS[index];if(!r)return;
 const g=gameFor(r);editingRecordKey={session:r.session,p:r.p,g:r.g};
 const sessionSel=document.getElementById("form-session");ensureSelectValue(sessionSel,r.session,SESSIONS[r.session]?.label||r.session);sessionSel.value=r.session;
 populateGameSelect();syncEntryPlayerOptions();
 const playerSel=document.getElementById("form-player");ensureSelectValue(playerSel,r.p,r.p);playerSel.value=r.p;
 const gameSel=document.getElementById("form-game");ensureSelectValue(gameSel,r.g,r.g);gameSel.value=String(r.g);
 if(g){ensureSelectValue(document.getElementById("form-map"),g.map,g.map);document.getElementById("form-map").value=g.map;document.getElementById("form-winning-side").value=g.winner;document.getElementById("form-method").value=g.method}
 document.getElementById("form-role").value=r.role;
 document.getElementById("form-result").value=resultFor(r);
 document.getElementById("form-ejected").value=r.ejected?"Oui":"Non";
 document.getElementById("form-reports").value=String(r.reports||0);
 document.getElementById("form-repairs").value=String(Number.isFinite(r.repair)?r.repair:0);
 document.getElementById("form-tasks").value=String(r.tasks??0);
 document.getElementById("form-note").value=r.note||"";
 document.getElementById("events-list").innerHTML="";
 (r.kills||[]).forEach(target=>addEventRow({type:"kill",target}));
 const deathMatch=/^Tu(?:é|ée) par (.+)$/.exec(r.death||"");
 if(deathMatch||((r.death||"")!=="Survit"&&!String(r.death||"").startsWith("Éjecté")&&r.death)){addEventRow({type:"death",turn:r.turn,target:deathMatch?.[1]||"",pos:r.deathPos})}
 for(let i=0;i<(r.self||0);i++)addEventRow({type:"self"});
 if(!document.querySelector("#events-list .event-row"))addEventRow();
 document.getElementById("sabotages-list").innerHTML="";
 (r.sabotages||[]).forEach(sabotage=>addSabotageRow({sabotage}));
 updateSabotageCount();syncEntryRolePanels();refreshEventPlayerOptions();
 document.getElementById("save-entry-btn").textContent="Enregistrer les modifications";
 document.getElementById("entry-status").textContent=`Modification de ${r.p}, Game ${r.g} du ${SESSIONS[r.session]?.label||r.session}.`;
 document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view==="entry"));
 document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id==="view-entry"));
 window.scrollTo({top:document.getElementById("view-entry").offsetTop-80,behavior:"smooth"});
}
document.getElementById("save-entry-btn").addEventListener("click",()=>{
 const session=document.getElementById("form-session").value,gnum=Number(document.getElementById("form-game").value),player=document.getElementById("form-player").value,role=document.getElementById("form-role").value;
 const kills=[];let death="Survit",deathPos=null,deathTurn=null,self=0;
 document.querySelectorAll("#events-list .event-row").forEach(r=>{const type=r.querySelector(".ev-type").value,turn=turnNumber(r.querySelector(".ev-turn").value),target=r.querySelector(".ev-target")?.value||"";if(type==="kill"&&target)kills.push(target);if(type==="death"){death=target?`Tué par ${target}`:"Mort";deathPos=Number(r.querySelector(".ev-pos")?.value)||null;deathTurn=turn}if(type==="self")self++});
 const repairs=Math.max(0,Number(document.getElementById("form-repairs").value)||0);
 const sabotages=role==="Imposteur"?[...document.querySelectorAll("#sabotages-list .sab-type")].map(x=>x.value):[];
 const favSabGame=favoriteFromList(sabotages);
 const record={session,p:player,g:gnum,role,reports:Number(document.getElementById("form-reports").value)||0,self,sab:sabotages.length,sabotages,repair:role==="Crew"?repairs:0,kills:role==="Imposteur"?kills:undefined,death,deathPos,turn:deathTurn,tasks:role==="Crew"?(Number(document.getElementById("form-tasks").value)||0):null,totalTasks:role==="Crew"?9:null,ejected:document.getElementById("form-ejected").value==="Oui",note:document.getElementById("form-note").value.trim(),favoriteSabotage:favSabGame?.name||null};
 const identityChanged=editingRecordKey&&(editingRecordKey.session!==session||editingRecordKey.p!==player||editingRecordKey.g!==gnum);
 if(identityChanged&&RECORDS.some(r=>r.session===session&&r.p===player&&r.g===gnum)){alert("Une fiche existe déjà pour ce joueur dans cette game. Modifie-la directement depuis l’Admin.");return}
 if(identityChanged){
   const old=editingRecordKey,oldIndex=RECORDS.findIndex(r=>r.session===old.session&&r.p===old.p&&r.g===old.g);
   if(oldIndex>=0)RECORDS.splice(oldIndex,1);
   if(!RECORDS.some(r=>r.session===old.session&&r.g===old.g))GAMES=GAMES.filter(g=>!(g.session===old.session&&g.n===old.g));
 }
 const ri=RECORDS.findIndex(r=>r.session===session&&r.p===player&&r.g===gnum);if(ri>=0)RECORDS[ri]=record;else RECORDS.push(record);
 const winner=document.getElementById("form-winning-side").value,method=document.getElementById("form-method").value,map=document.getElementById("form-map").value;let game=GAMES.find(g=>g.session===session&&g.n===gnum);if(game){game.map=map;game.winner=winner;game.method=method}else{game={session,n:gnum,map,winner,method,t1Deaths:0};GAMES.push(game)}
 const observedT1=new Set(RECORDS.filter(r=>r.session===session&&r.g===gnum&&r.role==="Crew"&&r.turn===1).map(r=>r.p)).size;game.t1Deaths=Math.max(game.t1Deaths||0,observedT1);
 const wasEditing=!!editingRecordKey;editingRecordKey=null;document.getElementById("save-entry-btn").textContent="Enregistrer la fiche";saveAll();renderAll();document.getElementById("entry-status").textContent=`${wasEditing?"Modifié":"Enregistré"} : ${player}, Game ${gnum}. Les pages Stats et Joueurs ont été recalculées.`;
});

function addAdminSession(){
 const input=document.getElementById("admin-new-session-date"),status=document.getElementById("admin-session-status"),id=input.value;
 if(!id){status.textContent="Choisis une date.";return}
 if(SESSIONS[id]&&!DELETED_SESSIONS.has(id)){status.textContent="Cette session existe déjà.";return}
 DELETED_SESSIONS.delete(id);
 SESSIONS[id]=sessionMetaFromId(id);
 SESSION_PARTICIPANTS[id]=[];
 saveAll();refreshSessionSelectors();
 document.getElementById("form-session").value=id;populateGameSelect();syncEntryPlayerOptions();refreshEventPlayerOptions();
 renderSessions();renderAdminSessions();renderAdminParticipants();
 const adminSel=document.getElementById("admin-participant-session");adminSel.value=id;renderAdminParticipants();
 status.textContent=`Session du ${SESSIONS[id].label} ajoutée. Aucun membre n’est coché par défaut.`;
}
function renderAdminSessions(){
 const box=document.getElementById("admin-sessions-list"),status=document.getElementById("admin-manage-session-status");
 const ids=sessionIds();
 box.innerHTML=ids.map(id=>{
   const games=GAMES.filter(g=>g.session===id).length,records=RECORDS.filter(r=>r.session===id).length;
   return `<div class="admin-session-row" data-session="${esc(id)}">
     <div class="admin-session-main">
       <strong>${esc(SESSIONS[id]?.date||id)}</strong>
       <small>${games} game${games!==1?"s":""} • ${records} fiche${records!==1?"s":""}</small>
     </div>
     <label>Nouvelle date<input class="admin-session-edit-date" type="date" value="${esc(id)}"></label>
     <div class="admin-session-actions">
       <button type="button" class="secondary admin-session-edit">Modifier</button>
       <button type="button" class="danger admin-session-delete">Supprimer</button>
     </div>
   </div>`;
 }).join("");
 box.querySelectorAll(".admin-session-edit").forEach(btn=>btn.addEventListener("click",()=>editAdminSession(btn.closest(".admin-session-row"))));
 box.querySelectorAll(".admin-session-delete").forEach(btn=>btn.addEventListener("click",()=>deleteAdminSession(btn.closest(".admin-session-row"))));
 if(!ids.length)box.innerHTML='<p class="muted">Aucune session enregistrée.</p>';
 if(status&&!status.textContent)status.textContent="";
}
function editAdminSession(row){
 const oldId=row.dataset.session,newId=row.querySelector(".admin-session-edit-date").value,status=document.getElementById("admin-manage-session-status");
 if(!newId){status.textContent="Choisis une nouvelle date.";return}
 if(newId===oldId){status.textContent="La date n’a pas changé.";return}
 if(SESSIONS[newId]){status.textContent="Une session existe déjà à cette date.";return}
 DELETED_SESSIONS.add(oldId);DELETED_SESSIONS.delete(newId);
 SESSIONS[newId]=sessionMetaFromId(newId);delete SESSIONS[oldId];
 GAMES.forEach(g=>{if(g.session===oldId)g.session=newId});
 RECORDS.forEach(r=>{if(r.session===oldId)r.session=newId});
 SESSION_PARTICIPANTS[newId]=SESSION_PARTICIPANTS[oldId]||[];delete SESSION_PARTICIPANTS[oldId];
 if(currentPlayerMode===oldId)currentPlayerMode=newId;
 saveAll();refreshSessionSelectors();populateGameSelect();syncEntryPlayerOptions();refreshEventPlayerOptions();renderAll();renderAdmin();
 const adminSel=document.getElementById("admin-participant-session");if([...adminSel.options].some(o=>o.value===newId)){adminSel.value=newId;renderAdminParticipants()}
 document.getElementById("admin-manage-session-status").textContent=`Session déplacée du ${oldId.split("-").reverse().join("/")} au ${SESSIONS[newId].label}.`;
}
function deleteAdminSession(row){
 const id=row.dataset.session,status=document.getElementById("admin-manage-session-status");
 if(sessionIds().length<=1){status.textContent="Impossible de supprimer la dernière session.";return}
 const games=GAMES.filter(g=>g.session===id).length,records=RECORDS.filter(r=>r.session===id).length;
 const label=SESSIONS[id]?.label||id;
 if(!confirm(`Supprimer définitivement la session du ${label} ?\n\nCela supprimera aussi ${games} game(s) et ${records} fiche(s) joueur associée(s).`))return;
 DELETED_SESSIONS.add(id);
 delete SESSIONS[id];delete SESSION_PARTICIPANTS[id];
 GAMES=GAMES.filter(g=>g.session!==id);RECORDS=RECORDS.filter(r=>r.session!==id);
 if(currentPlayerMode===id)currentPlayerMode="month";
 currentScope=availableMonths().includes(currentScope)?currentScope:latestMonth();
 currentPlayerMonth=availableMonths().includes(currentPlayerMonth)?currentPlayerMonth:latestMonth();
 saveAll();refreshSessionSelectors();populateGameSelect();syncEntryPlayerOptions();refreshEventPlayerOptions();renderAll();renderAdmin();
 document.getElementById("admin-manage-session-status").textContent=`Session du ${label} supprimée.`;
}
function renderAdminParticipants(){
 const sessionSel=document.getElementById("admin-participant-session"),list=document.getElementById("admin-participants-list");
 const sessions=Object.entries(SESSIONS).sort((a,b)=>b[0].localeCompare(a[0]));
 const old=sessionSel.value;
 sessionSel.innerHTML=sessions.map(([id,s])=>`<option value="${esc(id)}">${esc(s.label||s.date||id)}</option>`).join("");
 if(sessions.some(([id])=>id===old))sessionSel.value=old;
 const selected=new Set(participantNamesForSession(sessionSel.value));
 list.innerHTML=sortedPlayers().map(p=>`<label class="participant-check"><input type="checkbox" value="${esc(p.name)}" ${selected.has(p.name)?"checked":""}><span>${esc(p.name)}</span></label>`).join("");
}
function clearAdminParticipants(){
 document.querySelectorAll("#admin-participants-list input[type=\"checkbox\"]").forEach(x=>x.checked=false);
 document.getElementById("admin-participants-status").textContent="Tous les participants ont été décochés. Clique sur Enregistrer pour valider.";
}
function saveAdminParticipants(){
 const session=document.getElementById("admin-participant-session").value;
 const names=[...document.querySelectorAll("#admin-participants-list input:checked")].map(x=>x.value);
 const status=document.getElementById("admin-participants-status");
 SESSION_PARTICIPANTS[session]=names;
 saveAll();
 if(currentEntrySession()===session){syncEntryPlayerOptions();refreshEventPlayerOptions()}
 status.textContent=`${names.length} participant${names.length>1?"s":""} enregistré${names.length>1?"s":""} pour cette soirée.`;
}
function renderAdmin(){renderAdminSessions();renderAdminParticipants();const box=document.getElementById("admin-list"),sorted=[...RECORDS].sort((a,b)=>b.session.localeCompare(a.session)||b.g-a.g||a.p.localeCompare(b.p));box.innerHTML=sorted.map(r=>{const idx=RECORDS.indexOf(r),g=gameFor(r);return `<div class="admin-item"><div><strong>${esc(r.p)} • ${esc(SESSIONS[r.session]?.label||r.session)} • Game ${r.g}</strong><small>${esc(g?.map||"—")} • ${esc(r.role)} • ${resultFor(r)}</small></div><div class="admin-item-actions"><button class="secondary admin-edit-record" data-i="${idx}" type="button">Modifier</button><button class="danger" data-i="${idx}" type="button">Supprimer</button></div></div>`}).join("");box.querySelectorAll(".admin-edit-record").forEach(b=>b.addEventListener("click",()=>editRecordFromAdmin(Number(b.dataset.i))));box.querySelectorAll(".danger").forEach(b=>b.addEventListener("click",()=>{RECORDS.splice(Number(b.dataset.i),1);saveAll();renderAll();renderAdmin()}))}
document.getElementById("admin-add-session-btn").addEventListener("click",addAdminSession);document.getElementById("admin-participant-session").addEventListener("change",renderAdminParticipants);document.getElementById("clear-participants-btn").addEventListener("click",clearAdminParticipants);document.getElementById("save-participants-btn").addEventListener("click",saveAdminParticipants);
document.getElementById("admin-reset").addEventListener("click",()=>{DELETED_SESSIONS.clear();SESSIONS=structuredClone(SEED_SESSIONS);RECORDS=structuredClone(SEED_RECORDS);GAMES=structuredClone(SEED_GAMES);SESSION_PARTICIPANTS=Object.fromEntries(Object.keys(SESSIONS).map(id=>[id,[]]));currentScope=latestMonth();currentPlayerMonth=latestMonth();saveAll();refreshSessionSelectors();populateGameSelect();syncEntryPlayerOptions();renderAll();renderAdmin()});
function renderAll(){renderStats();renderSessions();renderPlayerList();syncPlayerMonth();renderPlayerTabs();renderPlayer()}
refreshSessionSelectors();initEntry();renderAll();
