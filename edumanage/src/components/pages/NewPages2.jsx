import { useState } from 'react';
import Modal from '../ui/Modal';

/* ══════════════ MESSAGERIE INTERNE ══════════════ */
export function Messaging({ showToast }) {
  const [selected, setSelected] = useState(0);
  const [reply, setReply] = useState('');
  const [newOpen, setNewOpen] = useState(false);

  const convs = [
    {id:1, from:'Prof. Martin', initials:'PM', role:'Enseignant', color:'linear-gradient(135deg,#3b82f6,#6366f1)', subject:'Résultats classe 5A', preview:'Les résultats du contrôle sont disponibles...', time:'09:45', unread:3},
    {id:2, from:'Direction', initials:'DIR', role:'Administration', color:'linear-gradient(135deg,#10b981,#34d399)', subject:'Réunion pédagogique vendredi', preview:'Rappel : réunion ce vendredi 17h en salle conf...', time:'08:30', unread:1},
    {id:3, from:'Prof. Dubois', initials:'SD', role:'Enseignant', color:'linear-gradient(135deg,#f59e0b,#fbbf24)', subject:'Programme T3 Français', preview:'Voici le programme prévu pour le 3ème trimestre...', time:'Hier', unread:0},
    {id:4, from:'Mme Claire', initials:'MC', role:'Enseignant', color:'linear-gradient(135deg,#8b5cf6,#a78bfa)', subject:'Spectacle de théâtre 20 Mars', preview:'La répétition générale est fixée au 18 mars...', time:'Hier', unread:0},
    {id:5, from:'Intendance', initials:'INT', role:'Administration', color:'linear-gradient(135deg,#ef4444,#f87171)', subject:'Commande fournitures urgente', preview:'Stock papier critique, commande à valider...', time:'Il y a 2j', unread:0},
    {id:6, from:'Coach Pierre', initials:'CP', role:'Enseignant', color:'linear-gradient(135deg,#6366f1,#8b5cf6)', subject:'Tournoi inter-établissements', preview:'Sélection des 30 élèves pour le tournoi du 28 mars...', time:'Il y a 3j', unread:0},
    {id:7, from:'Infirmerie', initials:'INF', role:'Santé', color:'linear-gradient(135deg,#14b8a6,#2dd4bf)', subject:'Renouvellement stock pharmacie', preview:'Ibuprofène et sérum physiologique à commander...', time:'Il y a 4j', unread:0},
  ];

  const sel = convs[selected];

  return (
    <div className="page-enter">
      <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:20,minHeight:600}}>
        {/* Sidebar */}
        <div className="card" style={{marginBottom:0,padding:0,overflow:'hidden'}}>
          <div style={{padding:'16px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15,fontWeight:700}}>💬 Messagerie</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>setNewOpen(true)}>✉️ Nouveau</button>
          </div>
          <div style={{overflowY:'auto',maxHeight:540}}>
            {convs.map((c, i) => (
              <div key={c.id} onClick={()=>setSelected(i)}
                style={{padding:'12px 16px',borderBottom:'1px solid rgba(51,65,85,.4)',cursor:'pointer',background:selected===i?'rgba(59,130,246,.1)':'transparent',borderLeft:`3px solid ${selected===i?'var(--accent)':'transparent'}`,transition:'all .2s'}}>
                <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <div className="avatar" style={{background:c.color,flexShrink:0}}>{c.initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
                      <span style={{fontWeight:c.unread?700:500,fontSize:13}}>{c.from}</span>
                      <span style={{fontSize:10,color:'var(--text-muted)'}}>{c.time}</span>
                    </div>
                    <div style={{fontSize:12,color:c.unread?'var(--text)':'var(--text-muted)',fontWeight:c.unread?600:400,marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.subject}</div>
                    <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.preview}</div>
                  </div>
                  {c.unread>0 && <div style={{background:'var(--accent)',color:'white',borderRadius:'50%',width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0}}>{c.unread}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="card" style={{marginBottom:0,display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20,paddingBottom:16,borderBottom:'1px solid var(--border)'}}>
            <div className="avatar" style={{background:sel.color,width:44,height:44,fontSize:14}}>{sel.initials}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:16}}>{sel.from}</div>
              <div style={{fontSize:12,color:'var(--accent)'}}>{sel.role}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Message archivé','success')}>📁</button>
              <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Message supprimé','danger')}>🗑️</button>
            </div>
          </div>
          <h3 style={{fontSize:17,fontWeight:700,marginBottom:12}}>{sel.subject}</h3>
          <p style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.7,flex:1}}>{sel.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <div style={{borderTop:'1px solid var(--border)',paddingTop:16,marginTop:16}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>↩ Répondre</div>
            <textarea className="form-textarea" style={{width:'100%',marginBottom:10}} placeholder="Votre réponse..." value={reply} onChange={e=>setReply(e.target.value)} />
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Transféré','success')}>↗️ Transférer</button>
              <button className="btn btn-primary" onClick={()=>{showToast('Message envoyé','success');setReply('');}}>📤 Envoyer</button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={newOpen} onClose={()=>setNewOpen(false)} title="✉️ Nouveau Message"
        footer={<><button className="btn btn-secondary" onClick={()=>setNewOpen(false)}>Annuler</button><button className="btn btn-primary" onClick={()=>{setNewOpen(false);showToast('Message envoyé','success');}}>📤 Envoyer</button></>}>
        <div className="form-grid">
          <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Destinataire(s)</label><select className="form-select"><option>Prof. Martin</option><option>Prof. Dubois</option><option>Direction</option><option>Tous les enseignants</option><option>Tout le personnel</option></select></div>
          <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Sujet</label><input className="form-input" placeholder="Sujet du message" /></div>
          <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Message</label><textarea className="form-textarea" style={{minHeight:120}} placeholder="Votre message..." /></div>
        </div>
      </Modal>
    </div>
  );
}

/* ══════════════ CONGÉS & ABSENCES RH ══════════════ */
export function Leaves({ showToast }) {
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Demandes en Attente</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⏳</span></div><div className="stat-value">5</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Approuvées (Mars)</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">12</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Personnel Absent</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>🏖️</span></div><div className="stat-value">4</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Jours Restants Moy.</span><span className="stat-icon">📅</span></div><div className="stat-value">14.2j</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:20}}>
        <div className="card" style={{marginBottom:0}}>
          <div className="card-header">
            <h3 className="card-title">🏖️ Demandes de Congés</h3>
            <div style={{display:'flex',gap:8}}>
              <select className="form-select" style={{width:'auto'}}><option>Toutes</option><option>En attente</option><option>Approuvées</option><option>Refusées</option></select>
              <button className="btn btn-primary btn-sm" onClick={()=>showToast('Demande créée','success')}>➕ Nouvelle Demande</button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Employé</th><th>Type</th><th>Début</th><th>Fin</th><th>Jours</th><th>Motif</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {name:'Claire Moreau',initials:'CM',color:'linear-gradient(135deg,#ef4444,#f87171)',type:'Congé annuel',start:'10 Mar 2026',end:'21 Mar 2026',days:10,motif:'—',status:'approved'},
                  {name:'Pierre Martin',initials:'PM',color:'linear-gradient(135deg,#3b82f6,#6366f1)',type:'Congé maladie',start:'05 Mar 2026',end:'07 Mar 2026',days:3,motif:'Grippe',status:'approved'},
                  {name:'Sophie Dubois',initials:'SD',color:'linear-gradient(135deg,#10b981,#34d399)',type:'Congé annuel',start:'01 Avr 2026',end:'10 Avr 2026',days:8,motif:'—',status:'pending'},
                  {name:'Anne Richard',initials:'AR',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',type:'RTT',start:'06 Mar 2026',end:'06 Mar 2026',days:1,motif:'—',status:'pending'},
                  {name:'Marc Beaumont',initials:'MB',color:'linear-gradient(135deg,#6366f1,#8b5cf6)',type:'Congé sans solde',start:'01 Avr 2026',end:'30 Avr 2026',days:22,motif:'Projet personnel',status:'refused'},
                  {name:'Pierre Martin',initials:'PM',color:'linear-gradient(135deg,#3b82f6,#6366f1)',type:'Congé exceptionnel',start:'10 Mar 2026',end:'11 Mar 2026',days:2,motif:'Décès familial',status:'pending'},
                ].map((c,i)=>(
                  <tr key={i}>
                    <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="avatar" style={{background:c.color,width:28,height:28,fontSize:10}}>{c.initials}</div><span style={{fontSize:13}}>{c.name}</span></div></td>
                    <td style={{fontSize:12}}>{c.type}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.start}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.end}</td>
                    <td style={{fontWeight:700}}>{c.days}j</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.motif}</td>
                    <td><span className={`badge ${c.status==='approved'?'badge-success':c.status==='pending'?'badge-warning':'badge-danger'}`}>{c.status==='approved'?'Approuvé':c.status==='pending'?'En attente':'Refusé'}</span></td>
                    <td>
                      <div className="action-menu">
                        {c.status==='pending' && <>
                          <div className="action-btn" onClick={()=>showToast('Congé approuvé ✓','success')}>✅</div>
                          <div className="action-btn" onClick={()=>showToast('Congé refusé','danger')}>❌</div>
                        </>}
                        <div className="action-btn" onClick={()=>showToast('Email envoyé','success')}>📧</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-header"><h3 className="card-title">📊 Soldes de Congés</h3></div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {[
                {name:'Pierre Martin',taken:7,total:25,color:'#10b981'},
                {name:'Sophie Dubois',taken:19,total:25,color:'#f59e0b'},
                {name:'Luc Bernard',taken:13,total:25,color:'#3b82f6'},
                {name:'Anne Richard',taken:22,total:25,color:'#ef4444'},
              ].map((emp,i)=>(
                <div key={i} style={{background:'var(--primary)',borderRadius:8,padding:12}}>
                  <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:4}}>{emp.name}</div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:13}}>
                    <span>Restants</span>
                    <span style={{fontWeight:700,color:emp.color}}>{emp.total-emp.taken}j / {emp.total}j</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${((emp.total-emp.taken)/emp.total)*100}%`,background:emp.color}} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{marginBottom:0}}>
            <div className="card-header"><h3 className="card-title">📋 Types de Congés</h3></div>
            <div style={{fontSize:12,display:'flex',flexDirection:'column',gap:8}}>
              {[['Congé annuel','25 jours/an'],['RTT','12 jours/an'],['Maladie','Justificatif requis'],['Maternité/Paternité','Légal'],['Exceptionnel','Cas par cas']].map(([l,v],i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(51,65,85,.3)'}}>
                  <span style={{color:'var(--text-muted)'}}>{l}</span>
                  <span style={{fontWeight:700}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ PORTAIL PARENTS ══════════════ */
export function Parents({ showToast }) {
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Parents Inscrits</span><span className="stat-icon">📱</span></div><div className="stat-value">987</div><div className="stat-change positive">↑ 98.7% connectés</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Messages Envoyés</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✉️</span></div><div className="stat-value">1 243</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">En Attente Réponse</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⏳</span></div><div className="stat-value">4</div></div>
        <div className="stat-card purple"><div className="stat-header"><span className="stat-title">Réunions Planifiées</span><span className="stat-icon" style={{background:'rgba(139,92,246,.1)',color:'#8b5cf6'}}>📆</span></div><div className="stat-value">12</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📨 Messages des Parents</h3>
          <div style={{display:'flex',gap:8}}>
            <select className="form-select" style={{width:'auto'}}><option>Tous</option><option>Non lus</option><option>En attente</option></select>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Nouveau message','success')}>✉️ Nouveau Message</button>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {name:'Michel Dubois',initials:'MD',color:'linear-gradient(135deg,#3b82f6,#6366f1)',child:'Alice Dubois — 5A',msg:'Bonjour, je souhaite un rendez-vous avec le professeur principal concernant les résultats du dernier contrôle.',time:'Il y a 30 min',status:'unread',border:'var(--accent)'},
            {name:'Lucie Martin',initials:'LM',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',child:'Baptiste Martin — 6B',msg:'Mon fils sera absent les 10 et 11 mars pour des raisons médicales. Je joins le certificat ci-joint.',time:'Hier 14h22',status:'pending',border:'var(--warning)'},
            {name:'Anne Richard',initials:'AR',color:'linear-gradient(135deg,#10b981,#34d399)',child:'Sophie Richard — 4C',msg:"Merci pour le bulletin du 2e trimestre. Sophie est très motivée cette année !",time:'03/03/2026',status:'replied',border:'var(--success)'},
          ].map((m,i)=>(
            <div key={i} style={{background:'var(--primary)',borderRadius:10,padding:16,borderLeft:`4px solid ${m.border}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div className="avatar" style={{background:m.color}}>{m.initials}</div>
                  <div>
                    <strong style={{fontSize:14}}>{m.name}</strong>
                    <div style={{fontSize:11,color:'var(--text-muted)'}}>Parent de {m.child}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span className={`badge ${m.status==='unread'?'badge-info':m.status==='pending'?'badge-warning':'badge-success'}`}>{m.status==='unread'?'Non lu':m.status==='pending'?'En attente':'Répondu'}</span>
                  <span style={{fontSize:11,color:'var(--text-muted)'}}>{m.time}</span>
                </div>
              </div>
              <p style={{fontSize:13,color:'var(--text-muted)',marginBottom:12}}>{m.msg}</p>
              <div style={{display:'flex',gap:8}}>
                {m.status==='pending' && <button className="btn btn-success btn-sm" onClick={()=>showToast('Absence justifiée','success')}>✅ Justifier</button>}
                <button className="btn btn-primary btn-sm" onClick={()=>showToast('Réponse envoyée','success')}>↩ Répondre</button>
                {m.status!=='replied' && <button className="btn btn-secondary btn-sm" onClick={()=>showToast('RDV planifié','success')}>📅 RDV</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">📅 Réunions Parents-Professeurs</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('RDV planifié','success')}>➕ Planifier Réunion</button></div>
        <div className="table-container">
          <table>
            <thead><tr><th>Date</th><th>Parent</th><th>Élève</th><th>Enseignant</th><th>Motif</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              {[
                {date:'10 Mars 2026 — 09h30',parent:'Michel Dubois',student:'Alice Dubois (5A)',teacher:'Prof. Martin',motif:'Résultats académiques',status:'confirmed'},
                {date:'12 Mars 2026 — 14h00',parent:'Jean Rousseau',student:'David Rousseau (3A)',teacher:'Prof. Laurent',motif:'Absences répétées',status:'urgent'},
                {date:'15 Mars 2026 — 16h30',parent:'Lucie Martin',student:'Baptiste Martin (6B)',teacher:'Prof. Dubois',motif:'Suivi scolaire',status:'pending'},
              ].map((r,i)=>(
                <tr key={i}>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{r.date}</td>
                  <td style={{fontWeight:600,fontSize:13}}>{r.parent}</td>
                  <td style={{fontSize:12}}>{r.student}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{r.teacher}</td>
                  <td style={{fontSize:12}}>{r.motif}</td>
                  <td><span className={`badge ${r.status==='confirmed'?'badge-warning':r.status==='urgent'?'badge-danger':'badge-info'}`}>{r.status==='confirmed'?'Confirmé':r.status==='urgent'?'Urgent':'En attente'}</span></td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast('Rappel envoyé','success')}>🔔</div>
                      <div className="action-btn" onClick={()=>showToast('RDV annulé','danger')}>✕</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">📢 Notifications Envoyées</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Notification envoyée','success')}>📢 Envoyer Notification</button></div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {title:'📝 Examens du 3e Trimestre',sub:'Envoyé à tous les parents • 01/03/2026',count:'987 reçus',badge:'badge-success'},
            {title:'🍽️ Menus Cantine — Mars 2026',sub:'Envoyé aux abonnés cantine • 28/02/2026',count:'643 reçus',badge:'badge-success'},
            {title:'⚠️ Fermeture Exceptionnelle — 20 Mars',sub:'Envoyé à tous les parents • 25/02/2026',count:'987 reçus',badge:'badge-warning'},
          ].map((n,i)=>(
            <div key={i} style={{background:'var(--primary)',borderRadius:8,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600,fontSize:14}}>{n.title}</div>
                <div style={{fontSize:12,color:'var(--text-muted)'}}>{n.sub}</div>
              </div>
              <span className={`badge ${n.badge}`}>{n.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ INFIRMERIE ══════════════ */
export function Infirmerie({ showToast }) {
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Visites Aujourd'hui</span><span className="stat-icon">🏥</span></div><div className="stat-value">7</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Renvoyés à Domicile</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>🏠</span></div><div className="stat-value">2</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Alertes Allergies</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⚠️</span></div><div className="stat-value">18</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Traitements en Cours</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>💊</span></div><div className="stat-value">11</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div className="card" style={{marginBottom:0}}>
          <div className="card-header"><h3 className="card-title">📋 Journal du Jour</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Visite enregistrée','success')}>➕ Nouvelle Visite</button></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {name:'Emma Bernard — 5B', time:'08h45', motif:'🤒 Maux de tête, fièvre légère (38°C)', decision:'Renvoyée à domicile', color:'var(--danger)', border:'#ef4444'},
              {name:'Thomas Blanc — 6A', time:'10h20', motif:'🤕 Chute en EPS — entorse légère', decision:'Repos + bandage', color:'var(--warning)', border:'#f59e0b'},
              {name:'Léa Moreau — 4C', time:'11h05', motif:'💊 Prise médicament traitement journalier', decision:'Retournée en classe', color:'var(--success)', border:'#10b981'},
              {name:'Hugo Petit — 3A', time:'13h50', motif:'🤢 Malaise après le déjeuner', decision:'Surveillance 30 min', color:'var(--accent)', border:'#3b82f6'},
            ].map((v,i)=>(
              <div key={i} style={{background:'var(--primary)',borderRadius:8,padding:12,borderLeft:`4px solid ${v.border}`}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <strong style={{fontSize:13}}>{v.name}</strong>
                  <span style={{fontSize:11,color:'var(--text-muted)'}}>{v.time}</span>
                </div>
                <div style={{fontSize:12,marginBottom:4}}>{v.motif}</div>
                <div style={{fontSize:12}}>Décision : <span style={{color:v.color,fontWeight:600}}>{v.decision}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{marginBottom:0}}>
          <div className="card-header"><h3 className="card-title">🩺 Fiches Santé Élèves</h3><input className="form-input" placeholder="🔍 Rechercher..." style={{width:'auto'}} /></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              {name:'Alice Dubois — 5A',initials:'AD',color:'linear-gradient(135deg,#3b82f6,#6366f1)',blood:'A+',allergies:'Aucune',note:null,badge:'badge-success',badgeLabel:'RAS'},
              {name:'Emma Bernard — 5B',initials:'EB',color:'linear-gradient(135deg,#ef4444,#f87171)',blood:'O+',allergies:'Pénicilline, Arachides',note:'⚠️ EpiPen disponible à l\'infirmerie',noteColor:'var(--danger)',badge:'badge-warning',badgeLabel:'Allergie'},
              {name:'David Rousseau — 3A',initials:'DR',color:'linear-gradient(135deg,#6366f1,#8b5cf6)',blood:'B+',allergies:'Asthme modéré',note:'💊 Ventoline — 1 bouffée si crise',noteColor:'var(--purple)',badge:'badge-purple',badgeLabel:'Traitement'},
              {name:'Camille Lefebvre — 4C',initials:'CL',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',blood:'AB+',allergies:'Aucune',note:null,badge:'badge-success',badgeLabel:'RAS'},
            ].map((s,i)=>(
              <div key={i} style={{background:'var(--primary)',borderRadius:8,padding:12}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div className="avatar" style={{background:s.color,width:28,height:28,fontSize:10}}>{s.initials}</div>
                    <strong style={{fontSize:13}}>{s.name}</strong>
                  </div>
                  <span className={`badge ${s.badge}`}>{s.badgeLabel}</span>
                </div>
                <div style={{fontSize:12,color:'var(--text-muted)'}}>Groupe : {s.blood} • {s.allergies}</div>
                {s.note && <div style={{fontSize:12,color:s.noteColor,marginTop:4}}>{s.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:20}}>
        <div className="card-header"><h3 className="card-title">💊 Stock Pharmacie</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Médicament ajouté','success')}>➕ Ajouter</button></div>
        <div className="table-container">
          <table>
            <thead><tr><th>Médicament</th><th>Catégorie</th><th>Quantité</th><th>Expiration</th><th>État</th><th>Actions</th></tr></thead>
            <tbody>
              {[
                {med:'Paracétamol 500mg',cat:'Antalgique',qty:'48 cp.',exp:'12/2027',status:'ok'},
                {med:'Ibuprofène 200mg',cat:'Anti-inflammatoire',qty:'30 cp.',exp:'06/2026',status:'low'},
                {med:'Désinfectant Bétadine',cat:'Antiseptique',qty:'2 flacons',exp:'03/2027',status:'ok'},
                {med:'Pansements variés',cat:'Matériel',qty:'120 unités',exp:'—',status:'ok'},
                {med:'Sérum physiologique',cat:'Soins',qty:'5 flacons',exp:'09/2026',status:'low'},
              ].map((m,i)=>(
                <tr key={i}>
                  <td><strong>{m.med}</strong></td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{m.cat}</td>
                  <td>{m.qty}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{m.exp}</td>
                  <td><span className={`badge ${m.status==='ok'?'badge-success':'badge-warning'}`}>{m.status==='ok'?'OK':'Stock faible'}</span></td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast('Commande créée','success')}>🛒</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ ACTIVITÉS PARASCOLAIRES ══════════════ */
export function Activities({ showToast }) {
  const clubs = [
    {icon:'🎭',name:'Club Théâtre',badge:'badge-purple',badgeLabel:'Arts',resp:'Mme Claire',schedule:'Mercredi 14h–16h',enrolled:24,max:30,pct:80,color:'#8b5cf6'},
    {icon:'⚽',name:'Football',badge:'badge-info',badgeLabel:'Sport',resp:'Coach Pierre',schedule:'Lun & Jeu 17h–18h30',enrolled:30,max:30,pct:100,color:'#3b82f6'},
    {icon:'🎵',name:'Chorale',badge:'badge-success',badgeLabel:'Musique',resp:'Prof. Lefort',schedule:'Vendredi 12h30–13h30',enrolled:18,max:30,pct:60,color:'#10b981'},
    {icon:'🔬',name:'Club Sciences',badge:'badge-warning',badgeLabel:'Sciences',resp:'Prof. Bernard',schedule:'Mardi 17h–18h',enrolled:13,max:28,pct:46,color:'#f59e0b'},
    {icon:'♟️',name:'Club Échecs',badge:'badge-purple',badgeLabel:'Jeux',resp:'Prof. Laurent',schedule:'Mercredi 13h–14h',enrolled:16,max:30,pct:53,color:'#6366f1'},
    {icon:'🎨',name:'Atelier Peinture',badge:'badge-danger',badgeLabel:'Arts',resp:'Prof. Claire',schedule:'Jeudi 17h–18h30',enrolled:22,max:30,pct:73,color:'#ef4444'},
  ];

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card purple"><div className="stat-header"><span className="stat-title">Clubs Actifs</span><span className="stat-icon" style={{background:'rgba(139,92,246,.1)',color:'#8b5cf6'}}>🎭</span></div><div className="stat-value">14</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Élèves Inscrits</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>👥</span></div><div className="stat-value">648</div><div className="stat-change positive">↑ 54% des élèves</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Événements ce Mois</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>🎉</span></div><div className="stat-value">6</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Budget Alloué</span><span className="stat-icon">💰</span></div><div className="stat-value">€ 8 500</div></div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎭 Clubs & Activités</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Nouveau club créé','success')}>➕ Nouveau Club</button></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14}}>
          {clubs.map((c,i)=>(
            <div key={i} style={{background:'var(--primary)',borderRadius:10,padding:16,borderTop:`3px solid ${c.color}`,border:'1px solid var(--border)',transition:'all .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.borderTopColor=c.color;}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{fontSize:22}}>{c.icon}</div>
                <span className={`badge ${c.badge}`}>{c.badgeLabel}</span>
              </div>
              <h4 style={{fontSize:14,marginBottom:4,fontWeight:700}}>{c.name}</h4>
              <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:8}}>Responsable : {c.resp} • {c.schedule}</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width:`${c.pct}%`,background:`linear-gradient(90deg,${c.color},${c.color}aa)`}} />
              </div>
              <div style={{fontSize:11,color:c.enrolled===c.max?'var(--danger)':'var(--text-muted)',marginTop:4,marginBottom:12}}>
                {c.enrolled}/{c.max} élèves inscrits {c.enrolled===c.max?'— Complet':''}
              </div>
              <button className="btn btn-secondary btn-sm" style={{width:'100%'}} onClick={()=>showToast(`Club ${c.name} ouvert`,'success')}>👁️ Gérer</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎉 Événements & Sorties Scolaires</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Événement ajouté','success')}>➕ Nouvel Événement</button></div>
        <div className="table-container">
          <table>
            <thead><tr><th>Événement</th><th>Date</th><th>Participants</th><th>Responsable</th><th>Budget</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              {[
                {ev:'🎭 Spectacle de Théâtre',date:'20 Mars 2026',participants:"Toute l'école (1 254)",resp:'Mme Claire',budget:'€ 800',status:'prep'},
                {ev:'⚽ Tournoi Inter-Établissements',date:'28 Mars 2026',participants:'30 élèves',resp:'Coach Pierre',budget:'€ 300',status:'confirmed'},
                {ev:'🏛️ Sortie Musée d\'Histoire',date:'05 Avr 2026',participants:'Classe 3A (32)',resp:'Prof. Laurent',budget:'€ 450',status:'pending'},
                {ev:'🎵 Concert Chorale',date:'10 Avr 2026',participants:'18 élèves',resp:'Prof. Lefort',budget:'€ 200',status:'confirmed'},
              ].map((ev,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{ev.ev}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{ev.date}</td>
                  <td style={{fontSize:12}}>{ev.participants}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{ev.resp}</td>
                  <td style={{fontWeight:600}}>{ev.budget}</td>
                  <td><span className={`badge ${ev.status==='confirmed'?'badge-success':ev.status==='prep'?'badge-warning':'badge-info'}`}>{ev.status==='confirmed'?'Confirmé':ev.status==='prep'?'Préparation':'En validation'}</span></td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast('Détails ouverts','success')}>👁️</div>
                      {ev.status==='pending' && <div className="action-btn" onClick={()=>showToast('Approuvé','success')}>✓</div>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ UTILISATEURS & RÔLES ══════════════ */
export function Users({ showToast }) {
  const roles = [
    {icon:'👑',name:'Administrateur',badge:'badge-danger',level:'Super Admin',desc:'Accès complet à tous les modules',perms:['Tout'],color:'#ef4444',count:3},
    {icon:'👨‍💼',name:'Direction',badge:'badge-info',level:'Niveau 2',desc:'Gestion complète sauf paramètres système',perms:['Rapports','RH','Finances'],color:'#3b82f6',count:5},
    {icon:'👨‍🏫',name:'Enseignant',badge:'badge-success',level:'Niveau 3',desc:'Notes, présences, emploi du temps',perms:['Notes','Présence','EDT'],color:'#10b981',count:48},
    {icon:'🏥',name:'Infirmier(ère)',badge:'badge-warning',level:'Niveau 4',desc:'Infirmerie et fiches santé uniquement',perms:['Infirmerie','Élèves (lecture)'],color:'#f59e0b',count:2},
    {icon:'🏦',name:'Comptable',badge:'badge-purple',level:'Niveau 4',desc:'Module finances uniquement',perms:['Finances','Rapports financiers'],color:'#8b5cf6',count:3},
    {icon:'📱',name:'Parent',badge:'badge-info',level:'Niveau 5',desc:'Portail parents — lecture seule',perms:['Notes (lecture)','Présence (lecture)'],color:'#6366f1',count:987},
  ];

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Utilisateurs Actifs</span><span className="stat-icon">🔐</span></div><div className="stat-value">89</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Rôles Définis</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>🎭</span></div><div className="stat-value">6</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Comptes Inactifs</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>😴</span></div><div className="stat-value">4</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Tentatives Échouées</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>🚫</span></div><div className="stat-value">3</div><div className="stat-change negative">Aujourd'hui</div></div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎭 Rôles & Permissions</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Nouveau rôle créé','success')}>➕ Nouveau Rôle</button></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
          {roles.map((r,i)=>(
            <div key={i} style={{background:'var(--primary)',borderRadius:10,padding:16,borderLeft:`4px solid ${r.color}`,border:'1px solid var(--border)',transition:'all .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <h4 style={{fontSize:14}}>{r.icon} {r.name}</h4>
                <span className={`badge ${r.badge}`}>{r.level}</span>
              </div>
              <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:10}}>{r.desc}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:12}}>
                {r.perms.map(p=><span key={p} className={`badge ${r.badge}`}>{p}</span>)}
              </div>
              <div style={{fontSize:12,color:'var(--text-muted)'}}>{r.count} utilisateur{r.count>1?'s':''}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">👥 Gestion des Utilisateurs</h3>
          <div style={{display:'flex',gap:8}}>
            <select className="form-select" style={{width:'auto'}}><option>Tous les rôles</option><option>Administrateur</option><option>Enseignant</option><option>Comptable</option></select>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Utilisateur ajouté','success')}>➕ Nouvel Utilisateur</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Dernière Connexion</th><th>Statut</th><th>2FA</th><th>Actions</th></tr></thead>
            <tbody>
              {[
                {name:'Jean Dupont',initials:'JD',color:'linear-gradient(135deg,#3b82f6,#6366f1)',email:'j.dupont@edu.fr',role:'Administrateur',badge:'badge-danger',last:"Aujourd'hui 09h14",active:true,tfa:true},
                {name:'Pierre Martin',initials:'PM',color:'linear-gradient(135deg,#10b981,#34d399)',email:'p.martin@edu.fr',role:'Enseignant',badge:'badge-success',last:"Aujourd'hui 08h45",active:true,tfa:true},
                {name:'Sophie Dubois',initials:'SD',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',email:'s.dubois@edu.fr',role:'Enseignant',badge:'badge-success',last:'Hier 17h22',active:true,tfa:false},
                {name:'Marie Robert',initials:'MR',color:'linear-gradient(135deg,#8b5cf6,#a78bfa)',email:'m.robert@edu.fr',role:'Comptable',badge:'badge-purple',last:'02/03/2026 11h00',active:true,tfa:true},
                {name:'Thomas Legrand',initials:'TL',color:'linear-gradient(135deg,#ef4444,#f87171)',email:'t.legrand@edu.fr',role:'Enseignant',badge:'badge-success',last:'12/01/2026 08h10',active:false,tfa:false},
              ].map((u,i)=>(
                <tr key={i}>
                  <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="avatar" style={{background:u.color,width:28,height:28,fontSize:10}}>{u.initials}</div><strong style={{fontSize:13}}>{u.name}</strong></div></td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{u.email}</td>
                  <td><span className={`badge ${u.badge}`}>{u.role}</span></td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{u.last}</td>
                  <td><span className={`badge ${u.active?'badge-success':'badge-warning'}`}>{u.active?'Actif':'Inactif'}</span></td>
                  <td style={{textAlign:'center',fontSize:16}}><span style={{color:u.tfa?'#10b981':'var(--text-muted)'}}>{u.tfa?'✓':'✗'}</span></td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast('Profil ouvert','success')}>👁️</div>
                      <div className="action-btn" onClick={()=>showToast('Mot de passe réinitialisé','success')}>🔑</div>
                      {!u.active && <div className="action-btn" onClick={()=>showToast('Compte réactivé','success')}>✓</div>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">📜 Journal d'Activité Système</h3><button className="btn btn-secondary btn-sm" onClick={()=>showToast('Journal exporté','success')}>📤 Exporter</button></div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {type:'CONNEXION',typeColor:'#10b981',icon:'✅',msg:<>— <strong>Jean Dupont</strong> <span style={{color:'var(--text-muted)'}}>(Administrateur)</span></>,time:"Aujourd'hui 09:14"},
            {type:'MODIFICATION',typeColor:'#3b82f6',icon:'📝',msg:<>— <strong>Pierre Martin</strong> a modifié les notes de la classe 5A</>,time:"Aujourd'hui 09:02"},
            {type:'ÉCHEC',typeColor:'#ef4444',icon:'🚫',msg:<>— Tentative de connexion échouée sur le compte <strong>s.dubois</strong></>,time:"Aujourd'hui 08:53"},
            {type:'EXPORT',typeColor:'#f59e0b',icon:'⬇️',msg:<>— <strong>Marie Robert</strong> a exporté le rapport financier T2</>,time:'Hier 16:40'},
            {type:'CRÉATION',typeColor:'#10b981',icon:'➕',msg:<>— <strong>Jean Dupont</strong> a créé un nouvel utilisateur (T. Legrand)</>,time:'Hier 14:22'},
          ].map((l,i)=>(
            <div key={i} style={{background:'var(--primary)',borderRadius:8,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:13}}>
                <span style={{fontSize:12,color:l.typeColor,fontWeight:700}}>{l.icon} {l.type}</span> {l.msg}
              </div>
              <span style={{fontSize:11,color:'var(--text-muted)',flexShrink:0,marginLeft:12}}>{l.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
