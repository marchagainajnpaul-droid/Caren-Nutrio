
//  SÉCURITÉ ADMIN
//   Le bouton admin est INVISIBLE dans la sidebar.
//  Accès : 5 clics rapides sur l'icône  du logo.
//   Identifiants : admin / CarenNutrio2026!
//   5 tentatives max puis verrouillage session.
//   En production → remplacer par Firebase Auth.

const ADM = { u:'admin', p:btoa('CarenNutrio2026!') };
let ok = sessionStorage.getItem('ao')==='1';
let cc=0, ct=null, cs=1, lr=null;
let dt = JSON.parse(localStorage.getItem('cn')||'[]');

// ── Secret trigger ──
function sClick(){
  cc++; clearTimeout(ct);
  ct = setTimeout(()=>cc=0, 1600);
  if(cc>=5){ cc=0; clearTimeout(ct); openL(); }
}

// ── Login ──
function openL(){ document.getElementById('ov').classList.add('open'); setTimeout(()=>document.getElementById('aU').focus(),80); document.getElementById('aE').textContent=''; }
function closeL(){ document.getElementById('ov').classList.remove('open'); document.getElementById('aU').value=''; document.getElementById('aP').value=''; document.getElementById('aE').textContent=''; }
function doL(){
  const t=parseInt(sessionStorage.getItem('t')||'0');
  if(t>=5){document.getElementById('aE').textContent='🚫 Trop de tentatives. Rafraîchis la page.';return;}
  const u=document.getElementById('aU').value.trim(), p=document.getElementById('aP').value;
  if(u===ADM.u&&btoa(p)===ADM.p){
    ok=true; sessionStorage.setItem('ao','1'); sessionStorage.setItem('t','0');
    closeL(); setAdmin(true); gp('admin');
  } else {
    sessionStorage.setItem('t',String(t+1));
    const r=4-t; document.getElementById('aE').textContent=`❌ Identifiants incorrects (${r} essai${r>1?'s':''} restant${r>1?'s':''})`;
    document.getElementById('aP').value='';
  }
}
function logout(){ ok=false; sessionStorage.removeItem('ao'); setAdmin(false); gp('accueil'); }
function setAdmin(on){
  document.getElementById('adminNav').style.display=on?'block':'none';
  document.getElementById('uAv').textContent=on?'G':'E';
  document.getElementById('uNm').textContent=on?'Gaina Marcha':'Étudiant';
  document.getElementById('uRl').textContent=on?'Administratrice':'Utilisateur';
}
if(ok) setAdmin(true);

// ── Navigation ──
function gp(p){
  if(p==='admin'&&!ok){openL();return;}
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
  document.getElementById('page-'+p)?.classList.add('active');
  const m=['accueil','questionnaire','resultats','info'];
  const i=m.indexOf(p); if(i>=0) document.querySelectorAll('.nav-item')[i]?.classList.add('active');
  if(p==='admin') loadA();
  if(p==='resultats'&&lr) render(lr);
  document.getElementById('sb').classList.remove('open');
}
function toggleSB(){ document.getElementById('sb').classList.toggle('open'); }

// ── Questionnaire ──
function nx(n){
  if(n>=2){ let ok=true; document.querySelectorAll('#s'+n+' select').forEach(s=>{ if(!s.value){s.classList.add('err');ok=false;}else s.classList.remove('err'); }); if(!ok)return; }
  document.getElementById('s'+n).classList.remove('active');
  document.getElementById('s'+(n+1))?.classList.add('active'); cs=n+1; upP();
}
function pv(n){ document.getElementById('s'+n).classList.remove('active'); document.getElementById('s'+(n-1))?.classList.add('active'); cs=n-1; upP(); }
function upP(){
  document.getElementById('pl').style.width=((cs-1)/4*100)+'%';
  for(let i=1;i<=5;i++) document.getElementById('d'+i).className='pdot'+(i<cs?' done':i===cs?' active':'');
}

// ── Scoring ──
function score(d){
  const f=+d.f,vd=+d.vd,vb=+d.vb,mg=+d.mg,rp=+d.rp;
  const ft=d.sx==='Féminin'?2:3;
  const fr=f<ft?(ft-f)*22:0;
  const nut=Math.min(100,Math.max(0,fr*0.3+(5-vd)*18*0.2+(5-vb)*16*0.2+(5-mg)*14*0.15+(3-rp)*26*0.15));
  const som=Math.min(100,(100-+d.so)*0.65+(6-+d.qq)*7);
  const ac=Math.min(100,+d.st*13 + +d.ch*0.35 + +d.ca*6 + +d.sx2*7);
  const cg=Math.min(100,+d.ft2*6 + +d.co*10 + +d.mm*10);
  const g=Math.round(nut*0.40+som*0.25+ac*0.20+cg*0.15);
  return{g,nut:Math.round(nut),som:Math.round(som),ac:Math.round(ac),cg:Math.round(cg),
    car:{f:{r:Math.min(100,fr),s:f},vd:{r:Math.round((5-vd)*18),s:vd},vb:{r:Math.round((5-vb)*16),s:vb},mg:{r:Math.round((5-mg)*14),s:mg}}};
}
function risk(g){
  if(g>=75)return{lb:'🔴 Risque Élevé',col:'#c0392b',ds:'Des carences importantes sont probables. Agis maintenant.',cl:'eleve'};
  if(g>=50)return{lb:'🟠 Risque Modéré',col:'#e07b3a',ds:'Plusieurs signaux d\'alerte. Des améliorations sont recommandées.',cl:'modere'};
  if(g>=25)return{lb:'🟡 Risque Faible',col:'#d4ac0d',ds:'Quelques points d\'attention. Surveille ton alimentation.',cl:'faible'};
  return{lb:'✅ Aucun Risque',col:'#2d6a4f',ds:'Ton profil nutritionnel est équilibré. Continue !',cl:'aucun'};
}
function sub(){
  let ok2=true;
  document.querySelectorAll('#s5 select').forEach(s=>{ if(!s.value){s.classList.add('err');ok2=false;}else s.classList.remove('err'); });
  if(!ok2)return;
  const d={ps:document.getElementById('ps').value||'Anonyme',ag:document.getElementById('ag').value,sx:document.getElementById('sx').value,nv:document.getElementById('nv').value,
    f:document.getElementById('qF').value,vd:document.getElementById('qD').value,vb:document.getElementById('qB').value,mg:document.getElementById('qM').value,rp:document.getElementById('qR').value,
    so:document.getElementById('qS').value,qq:document.getElementById('qQ').value,ch:document.getElementById('qC').value,
    st:document.getElementById('qT').value,ca:document.getElementById('qK').value,sx2:document.getElementById('qX').value,
    ft2:document.getElementById('qFt').value,co:document.getElementById('qCo').value,mm:document.getElementById('qMm').value,ts:new Date().toISOString()};
  const r=score(d); r.ps=d.ps; r.nv=d.nv; r.sx=d.sx; r.ts=d.ts; lr=r;
  dt.push(r); localStorage.setItem('cn',JSON.stringify(dt)); gp('resultats');
}
function render(r){
  document.getElementById('nres').style.display='none'; document.getElementById('rcon').style.display='block';
  const rk=risk(r.g);
  document.getElementById('rh').style.background=`linear-gradient(135deg,${rk.col},${rk.col}bb)`;
  document.getElementById('rsc').textContent=r.g; document.getElementById('rlb').textContent=rk.lb; document.getElementById('rdsc').textContent=rk.ds;
  const cl=[{k:'f',n:'Fer',i:'🩸',rv:r.car.f.r},{k:'vd',n:'Vitamine D',i:'☀️',rv:r.car.vd.r},{k:'vb',n:'Vitamine B12',i:'🧬',rv:r.car.vb.r},{k:'mg',n:'Magnésium',i:'🌿',rv:r.car.mg.r},{k:'so',n:'Sommeil',i:'😴',rv:r.som}];
  document.getElementById('ccards').innerHTML=cl.map(c=>{
    const c2=c.rv>=60?'rouge':c.rv>=35?'orange':'ok';
    const pp=c.rv>=60?'Déficit probable':c.rv>=35?'À surveiller':'Bon apport';
    return`<div class="cc ${c2}"><div class="cc-top"><span class="cc-ico">${c.i}</span><span class="cc-name">${c.n}</span></div><span class="cc-pill">${pp}</span><p class="cc-desc">${cdesc(c.k,c.rv)}</p><div class="cc-bar"><div class="cc-bfill" style="width:${Math.min(100,c.rv)}%"></div></div></div>`;
  }).join('');
  document.getElementById('recsL').innerHTML=mkR(r).map(x=>`<li class="rec ${x.t}"><span class="r-ico">${x.i}</span><span class="r-txt">${x.tx}</span></li>`).join('');
  document.getElementById('domS').innerHTML=[{n:'🥗 Nutrition',v:r.nut},{n:'😴 Sommeil',v:r.som},{n:'😰 Stress académique',v:r.ac},{n:'🧠 Fatigue cognitive',v:r.cg}].map(d=>{
    const c=d.v>60?'var(--red)':d.v>35?'var(--amber)':'var(--accent)';
    return`<div class="bar-row"><div class="bar-hd"><span>${d.n}</span><span>${d.v}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${d.v}%;background:${c}"></div></div></div>`;
  }).join('');
}
function cdesc(k,r){
  return({f:r>60?'Apport en fer insuffisant — risque d\'anémie et fatigue cognitive.':r>35?'Apport en fer à améliorer. Mange plus de légumineuses.':'Bon apport en fer.',
    vd:r>60?'Carence probable en vitamine D — impact sur la vitesse cognitive.':r>35?'Augmente exposition soleil et poisson gras.':'Bonne source de vitamine D.',
    vb:r>60?'Apport B12 faible — risque de fatigue mentale et troubles mnésiques.':r>35?'Augmente ta consommation de produits animaux.':'Apport B12 satisfaisant.',
    mg:r>60?'Magnésium insuffisant — anxiété et hyperémotivité probables.':r>35?'Mange plus de noix, cacao et légumes verts.':'Bon apport en magnésium.',
    so:r>60?'Manque de sommeil sévère — impact direct sur mémoire et concentration.':r>35?'Ton sommeil est insuffisant. Vise 7h minimum.':'Qualité de sommeil satisfaisante.'})[k]||'';
}
function mkR(r){
  const rec=[];
  if(r.car.f.r>35)rec.push({t:'alert',i:'🩸',tx:'<strong>Augmente ton apport en fer</strong> — légumineuses, œufs, viande 3–4 fois/sem. Le citron améliore l\'absorption.'});
  if(r.car.vd.r>35)rec.push({t:'warn',i:'☀️',tx:'<strong>Vitamine D</strong> — expose-toi au soleil 15–20 min/j et consomme du poisson gras 2 fois/sem.'});
  if(r.car.vb.r>35)rec.push({t:'warn',i:'🧬',tx:'<strong>Vitamine B12</strong> — intègre des produits animaux à chaque repas : œuf, poisson, lait, viande.'});
  if(r.car.mg.r>35)rec.push({t:'',i:'🌿',tx:'<strong>Magnésium contre le stress</strong> — noix, banane, cacao et légumes verts à chaque repas.'});
  if(r.som>35)rec.push({t:'alert',i:'😴',tx:'<strong>Priorité au sommeil</strong> — vise 7h minimum. Le manque de sommeil amplifie les effets des carences.'});
  if(r.ac>50)rec.push({t:'warn',i:'📚',tx:'<strong>Gestion du stress</strong> — planifie des pauses repas fixes même en période intensive.'});
  if(!rec.length)rec.push({t:'',i:'✅',tx:'<strong>Excellent profil !</strong> Continue tes bonnes habitudes et maintiens un sommeil régulier.'});
  rec.push({t:'',i:'⚕️',tx:'<strong>Rappel</strong> — Ces résultats sont indicatifs. En cas de symptômes, consulte un médecin ou nutritionniste.'});
  return rec;
}

// ── Admin ──
function loadA(){
  if(!ok)return;
  const d=JSON.parse(localStorage.getItem('cn')||'[]');
  document.getElementById('at').textContent=d.length;
  document.getElementById('ah').textContent=d.filter(x=>x.g>=75).length;
  document.getElementById('am').textContent=d.filter(x=>x.g>=50&&x.g<75).length;
  document.getElementById('ao').textContent=d.filter(x=>x.g<50).length;
  const pm={eleve:'pr',modere:'pa',faible:'pb',aucun:'pg'};
  document.getElementById('atb').innerHTML=d.length?d.map(x=>{const r=risk(x.g);return`<tr><td>${x.ps||'—'}</td><td>${x.nv||'—'}</td><td>${x.sx||'—'}</td><td><strong>${x.g}/100</strong></td><td><span class="pill ${pm[r.cl]}">${r.lb.replace(/[🔴🟠🟡✅]/g,'').trim()}</span></td><td>${x.ts?new Date(x.ts).toLocaleDateString('fr-FR'):'—'}</td></tr>`;}).join(''):'<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:26px">Aucune soumission pour l\'instant</td></tr>';
}
function exp(){
  if(!ok)return;
  const d=JSON.parse(localStorage.getItem('cn')||'[]');
  if(!d.length){alert('Aucune donnée.');return;}
  const h='pseudonyme,niveau,sexe,score_global,classe_risque,score_nutrition,score_sommeil,score_stress,score_fatigue,timestamp';
  const rows=d.map(x=>{const r=risk(x.g);return[x.ps||'',x.nv||'',x.sx||'',x.g,r.cl,x.nut||'',x.som||'',x.ac||'',x.cg||'',x.ts||''].join(',');});
  const bl=new Blob([[h,...rows].join('\n')],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download=`carennutrio_${new Date().toISOString().slice(0,10)}.csv`;a.click();
}