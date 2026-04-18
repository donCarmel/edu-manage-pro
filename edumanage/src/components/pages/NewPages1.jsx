import { useState } from 'react';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';

/* ══════════════ ANNÉES ACADÉMIQUES ══════════════ */
export function AcademicYears({ showToast }) {
  const [addOpen, setAddOpen] = useState(false);

  const years = [
    { year: '2025–2026', status: 'current', students: 1254, teachers: 87, classes: 42, start: '01 Sep 2025', end: '30 Jun 2026', trimestres: ['T1 : Sep–Déc 2025', 'T2 : Jan–Mar 2026', 'T3 : Avr–Jun 2026'] },
    { year: '2024–2025', status: 'closed', students: 1198, teachers: 84, classes: 40, start: '02 Sep 2024', end: '28 Jun 2025', trimestres: ['T1 terminé', 'T2 terminé', 'T3 terminé'] },
    { year: '2023–2024', status: 'closed', students: 1145, teachers: 82, classes: 38, start: '04 Sep 2023', end: '28 Jun 2024', trimestres: ['T1 terminé', 'T2 terminé', 'T3 terminé'] },
    { year: '2026–2027', status: 'planned', students: 0, teachers: 0, classes: 0, start: '01 Sep 2026', end: '30 Jun 2027', trimestres: ['À planifier', 'À planifier', 'À planifier'] },
  ];

  const statusConfig = {
    current: { badge: 'badge-success', label: 'En cours', color: '#10b981' },
    closed: { badge: 'badge-info', label: 'Clôturée', color: '#3b82f6' },
    planned: { badge: 'badge-warning', label: 'Planifiée', color: '#f59e0b' },
  };

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Années Enregistrées</span><span className="stat-icon">📆</span></div><div className="stat-value">4</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Année en Cours</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">2025–2026</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Trimestre Actuel</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>📅</span></div><div className="stat-value">T2</div></div>
        <div className="stat-card purple"><div className="stat-header"><span className="stat-title">Semaines Restantes</span><span className="stat-icon" style={{background:'rgba(139,92,246,.1)',color:'#8b5cf6'}}>⏱️</span></div><div className="stat-value">16 sem.</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📆 Gestion des Années Académiques</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setAddOpen(true)}>➕ Nouvelle Année</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16}}>
          {years.map((y, i) => {
            const cfg = statusConfig[y.status];
            return (
              <div key={i} style={{background:'var(--primary)',border:`1px solid var(--border)`,borderRadius:10,padding:20,borderTop:`3px solid ${cfg.color}`,transition:'all .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.borderTopColor=cfg.color;}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                  <h3 style={{fontSize:20,fontWeight:700}}>{y.year}</h3>
                  <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:14}}>
                  <div style={{textAlign:'center',background:'var(--card-bg)',borderRadius:8,padding:'8px 4px'}}>
                    <div style={{fontSize:18,fontWeight:700,color:'var(--accent)'}}>{y.students||'—'}</div>
                    <div style={{fontSize:10,color:'var(--text-muted)'}}>Élèves</div>
                  </div>
                  <div style={{textAlign:'center',background:'var(--card-bg)',borderRadius:8,padding:'8px 4px'}}>
                    <div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{y.teachers||'—'}</div>
                    <div style={{fontSize:10,color:'var(--text-muted)'}}>Enseignants</div>
                  </div>
                  <div style={{textAlign:'center',background:'var(--card-bg)',borderRadius:8,padding:'8px 4px'}}>
                    <div style={{fontSize:18,fontWeight:700,color:'#f59e0b'}}>{y.classes||'—'}</div>
                    <div style={{fontSize:10,color:'var(--text-muted)'}}>Classes</div>
                  </div>
                </div>
                <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:10}}>
                  📅 {y.start} → {y.end}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:14}}>
                  {y.trimestres.map((t, j) => (
                    <div key={j} style={{display:'flex',alignItems:'center',gap:8,fontSize:11}}>
                      <span style={{color: y.status==='closed' ? '#10b981' : j===1 && y.status==='current' ? '#f59e0b' : 'var(--text-muted)'}}>{y.status==='closed'?'✓':j===1&&y.status==='current'?'▶':y.status==='planned'?'○':'✓'}</span>
                      <span style={{color:'var(--text-muted)'}}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary btn-sm" style={{flex:1}} onClick={()=>showToast(`Année ${y.year} ouverte`,'success')}>
                    {y.status==='planned'?'⚙️ Configurer':'👁️ Voir Détails'}
                  </button>
                  {y.status==='planned' && <button className="btn btn-primary btn-sm" onClick={()=>showToast('Année activée','success')}>Activer</button>}
                  {y.status==='current' && <button className="btn btn-warning btn-sm" onClick={()=>showToast('Clôture initiée','warning')}>Clôturer</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">📅 Calendrier Scolaire 2025–2026</h3></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
          {[
            {period:'Rentrée', date:'01 Sep 2025', type:'success', icon:'🎒'},
            {period:'Vacances Toussaint', date:'25 Oct – 03 Nov 2025', type:'info', icon:'🍂'},
            {period:'Vacances Noël', date:'20 Déc 2025 – 05 Jan 2026', type:'info', icon:'🎄'},
            {period:'Fin Trimestre 1', date:'19 Déc 2025', type:'warning', icon:'📝'},
            {period:'Vacances Hiver', date:'21 Fév – 02 Mar 2026', type:'info', icon:'❄️'},
            {period:'Fin Trimestre 2', date:'20 Mar 2026', type:'warning', icon:'📝'},
            {period:'Vacances Printemps', date:'11 Avr – 27 Avr 2026', type:'info', icon:'🌸'},
            {period:'Examens Finaux', date:'01 Jun – 12 Jun 2026', type:'danger', icon:'🎓'},
            {period:'Fin Année Scolaire', date:'30 Jun 2026', type:'success', icon:'🏆'},
          ].map((ev,i)=>(
            <div key={i} style={{background:'var(--primary)',border:`1px solid var(--border)`,borderRadius:8,padding:12,display:'flex',alignItems:'center',gap:12}}>
              <div style={{fontSize:24,flexShrink:0}}>{ev.icon}</div>
              <div>
                <div style={{fontWeight:600,fontSize:13}}>{ev.period}</div>
                <div style={{fontSize:11,color:'var(--text-muted)',marginTop:2}}>{ev.date}</div>
              </div>
              <span className={`badge badge-${ev.type}`} style={{marginLeft:'auto',flexShrink:0}}>{ev.type==='success'?'Ouverture':ev.type==='danger'?'Examens':ev.type==='warning'?'Bilan':'Vacances'}</span>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="📆 Nouvelle Année Académique"
        footer={<><button className="btn btn-secondary" onClick={()=>setAddOpen(false)}>Annuler</button><button className="btn btn-primary" onClick={()=>{setAddOpen(false);showToast('Année créée','success');}}>Créer</button></>}>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Année scolaire *</label><input className="form-input" placeholder="Ex: 2026-2027" /></div>
          <div className="form-group"><label className="form-label">Date de début</label><input className="form-input" type="date" /></div>
          <div className="form-group"><label className="form-label">Date de fin</label><input className="form-input" type="date" /></div>
          <div className="form-group"><label className="form-label">Capacité max élèves</label><input className="form-input" type="number" defaultValue={1300} /></div>
        </div>
      </Modal>
    </div>
  );
}

/* ══════════════ INSCRIPTIONS ══════════════ */
export function Enrollment({ showToast }) {
  const [tab, setTab] = useState('pending');
  const [deleteTarget, setDeleteTarget] = useState(null);

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">En Attente</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⏳</span></div><div className="stat-value">12</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Acceptées</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">38</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Refusées</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>✗</span></div><div className="stat-value">3</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Dossiers Complets</span><span className="stat-icon">📋</span></div><div className="stat-value">45</div></div>
      </div>

      <div className="tab-bar">
        {[{id:'pending',label:'⏳ En attente (12)'},{id:'accepted',label:'✅ Acceptées'},{id:'refused',label:'❌ Refusées'}].map(t=>(
          <div key={t.id} className={`tab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.label}</div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📋 {tab==='pending'?'Demandes en Attente':tab==='accepted'?'Inscriptions Acceptées':'Inscriptions Refusées'}</h3>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Export généré','success')}>📤 Exporter</button>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Formulaire ouvert','success')}>➕ Nouvelle Inscription</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Dossier</th><th>Élève</th><th>Niveau Demandé</th><th>Classe Souhaitée</th><th>Date Dépôt</th><th>Parent</th><th>Dossier</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {[
                {id:'INS-001',name:'Thomas Leclerc',initials:'TL',color:'linear-gradient(135deg,#3b82f6,#6366f1)',level:'Sixième',class:'6A',date:'01 Mar 2026',parent:'Marie Leclerc',complete:true},
                {id:'INS-002',name:'Amélie Fournier',initials:'AF',color:'linear-gradient(135deg,#10b981,#34d399)',level:'Cinquième',class:'5A',date:'02 Mar 2026',parent:'Paul Fournier',complete:true},
                {id:'INS-003',name:'Lucas Girard',initials:'LG',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',level:'Quatrième',class:'4C',date:'03 Mar 2026',parent:'Claire Girard',complete:false},
                {id:'INS-004',name:'Sofia Diallo',initials:'SD',color:'linear-gradient(135deg,#8b5cf6,#a78bfa)',level:'Troisième',class:'3A',date:'04 Mar 2026',parent:'Ibrahim Diallo',complete:true},
              ].filter(()=>tab==='pending'||true).map((ins,i)=>(
                <tr key={i}>
                  <td><code style={{fontSize:11,color:'var(--accent)',background:'rgba(59,130,246,.1)',padding:'2px 6px',borderRadius:4}}>{ins.id}</code></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="avatar" style={{background:ins.color}}>{ins.initials}</div><strong>{ins.name}</strong></div></td>
                  <td>{ins.level}</td>
                  <td>{ins.class}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{ins.date}</td>
                  <td style={{fontSize:12}}>{ins.parent}</td>
                  <td><span className={`badge ${ins.complete?'badge-success':'badge-warning'}`}>{ins.complete?'Complet':'Incomplet'}</span></td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast(`Dossier ${ins.name} ouvert`,'success')} title="Voir">👁️</div>
                      {tab==='pending' && <>
                        <div className="action-btn" onClick={()=>showToast(`${ins.name} accepté(e)`,'success')} title="Accepter" style={{color:'#10b981'}}>✅</div>
                        <div className="action-btn" onClick={()=>setDeleteTarget(ins.name)} title="Refuser" style={{color:'#ef4444'}}>❌</div>
                      </>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={()=>showToast('Inscription refusée','danger')} target={`l'inscription de ${deleteTarget}`} />
    </div>
  );
}

/* ══════════════ CONSEIL DE CLASSE ══════════════ */
export function Council({ showToast }) {
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Conseils Prévus</span><span className="stat-icon">🏆</span></div><div className="stat-value">8</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Réalisés (T1+T2)</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">5</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">À Venir (T3)</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>📅</span></div><div className="stat-value">3</div></div>
        <div className="stat-card purple"><div className="stat-header"><span className="stat-title">PV Rédigés</span><span className="stat-icon" style={{background:'rgba(139,92,246,.1)',color:'#8b5cf6'}}>📄</span></div><div className="stat-value">5</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🏆 Conseils de Classe — T3 2025/2026</h3>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Convocations envoyées','success')}>📧 Envoyer Convocations</button>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Conseil programmé','success')}>➕ Programmer</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>Classe</th><th>Trimestre</th><th>Date Prévue</th><th>Heure</th><th>Salle</th><th>Délégués</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              {[
                {class:'5A',tri:'T3',date:'25 Avr 2026',hour:'14h00',room:'Salle 201',delegates:'Alice D. & Hugo M.',status:'planned'},
                {class:'6B',tri:'T3',date:'26 Avr 2026',hour:'10h00',room:'Salle 102',delegates:'Mathis L. & Eva R.',status:'planned'},
                {class:'4C',tri:'T3',date:'27 Avr 2026',hour:'16h00',room:'Salle 305',delegates:'Jules B. & Nina P.',status:'planned'},
                {class:'3A',tri:'T3',date:'28 Avr 2026',hour:'11h00',room:'Salle 201',delegates:'Lucas G. & Clara F.',status:'planned'},
                {class:'5A',tri:'T2',date:'21 Mar 2026',hour:'14h00',room:'Salle 201',delegates:'Alice D. & Hugo M.',status:'done'},
                {class:'6B',tri:'T2',date:'22 Mar 2026',hour:'10h00',room:'Salle 102',delegates:'Mathis L. & Eva R.',status:'done'},
              ].map((c,i)=>(
                <tr key={i}>
                  <td><strong>Classe {c.class}</strong></td>
                  <td><span className={`badge ${c.tri==='T3'?'badge-warning':'badge-info'}`}>{c.tri}</span></td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.date}</td>
                  <td style={{fontSize:12}}>{c.hour}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.room}</td>
                  <td style={{fontSize:11,color:'var(--text-muted)'}}>{c.delegates}</td>
                  <td><span className={`badge ${c.status==='done'?'badge-success':'badge-warning'}`}>{c.status==='done'?'Réalisé':'Planifié'}</span></td>
                  <td>
                    <div className="action-menu">
                      {c.status==='done' ? (
                        <div className="action-btn" onClick={()=>showToast('PV ouvert','success')}>📄</div>
                      ) : (
                        <>
                          <div className="action-btn" onClick={()=>showToast('Conseil ouvert','success')}>▶️</div>
                          <div className="action-btn" onClick={()=>showToast('Détails modifiés','success')}>✏️</div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Résultats T2 */}
      <div className="card">
        <div className="card-header"><h3 className="card-title">📊 Décisions du Conseil — T2</h3></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
          {[
            {class:'5A',felicitations:5,encouragements:8,avertissements:2,conv:'Conseil positif'},
            {class:'6B',felicitations:3,encouragements:10,avertissements:4,conv:'Plusieurs élèves en difficulté'},
            {class:'4C',felicitations:7,encouragements:6,avertissements:1,conv:'Excellent niveau général'},
            {class:'3A',felicitations:8,encouragements:5,avertissements:3,conv:'Préparation orientation'},
          ].map((cl,i)=>(
            <div key={i} style={{background:'var(--primary)',border:'1px solid var(--border)',borderRadius:10,padding:16}}>
              <h4 style={{fontWeight:700,marginBottom:12,fontSize:15}}>Classe {cl.class}</h4>
              <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
                <div style={{background:'rgba(16,185,129,.1)',borderRadius:8,padding:'6px 10px',textAlign:'center',flex:1}}>
                  <div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{cl.felicitations}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)'}}>Félicitations</div>
                </div>
                <div style={{background:'rgba(59,130,246,.1)',borderRadius:8,padding:'6px 10px',textAlign:'center',flex:1}}>
                  <div style={{fontSize:18,fontWeight:700,color:'#3b82f6'}}>{cl.encouragements}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)'}}>Encouragements</div>
                </div>
                <div style={{background:'rgba(239,68,68,.1)',borderRadius:8,padding:'6px 10px',textAlign:'center',flex:1}}>
                  <div style={{fontSize:18,fontWeight:700,color:'#ef4444'}}>{cl.avertissements}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)'}}>Avertissements</div>
                </div>
              </div>
              <div style={{fontSize:12,color:'var(--text-muted)',fontStyle:'italic'}}>"{cl.conv}"</div>
              <button className="btn btn-secondary btn-sm" style={{width:'100%',marginTop:12}} onClick={()=>showToast(`PV Classe ${cl.class} ouvert`,'success')}>📄 Voir PV Complet</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ SALLES & RESSOURCES ══════════════ */
export function Rooms({ showToast }) {
  const rooms = [
    {name:'Salle 201', type:'Salle de cours', capacity:35, equip:'Tableau, Projecteur, WiFi', status:'free', color:'#10b981'},
    {name:'Amphi A', type:'Amphithéâtre', capacity:200, equip:'Scène, Sono, Projecteur HD', status:'occupied', color:'#f59e0b', until:'17:00'},
    {name:'Labo 1', type:'Laboratoire Sciences', capacity:24, equip:'Paillasses, Hottes, Microscopes', status:'free', color:'#3b82f6'},
    {name:'Salle Info', type:'Informatique', capacity:30, equip:'30 PC, Tableau numérique', status:'maintenance', color:'#ef4444', note:'Réseau en réparation'},
    {name:'Gymnase', type:'Sport', capacity:100, equip:'Vestiaires, Matériel EPS', status:'free', color:'#8b5cf6'},
    {name:'Salle Art', type:'Arts', capacity:28, equip:'Tables modulables, Matériel arts', status:'free', color:'#10b981'},
    {name:'Salle 102', type:'Salle de cours', capacity:30, equip:'Tableau blanc, Vidéoprojecteur', status:'free', color:'#10b981'},
    {name:'Labo Bio', type:'Laboratoire Bio', capacity:24, equip:'Microscopes, Matériel bio', status:'occupied', color:'#f59e0b', until:'12:00'},
    {name:'Salle Musique', type:'Musique', capacity:25, equip:'Instruments, Sono', status:'free', color:'#3b82f6'},
    {name:'Salle 305', type:'Salle de cours', capacity:32, equip:'Tableau, Wifi', status:'free', color:'#10b981'},
  ];

  const statusConfig = {
    free: { badge:'badge-success', label:'Libre', btn:'btn-primary', btnLabel:'📅 Réserver' },
    occupied: { badge:'badge-warning', label:'Occupée', btn:'btn-secondary', btnLabel:'📋 Voir planning' },
    maintenance: { badge:'badge-danger', label:'Maintenance', btn:'btn-secondary', btnLabel:'🔧 Voir rapport' },
  };

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Total Salles</span><span className="stat-icon">🚪</span></div><div className="stat-value">42</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Disponibles</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">28</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Occupées</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⏰</span></div><div className="stat-value">12</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Maintenance</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>🔧</span></div><div className="stat-value">2</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🚪 Inventaire des Salles</h3>
          <div style={{display:'flex',gap:8}}>
            <select className="form-select" style={{width:'auto'}}><option>Tous les types</option><option>Salle de cours</option><option>Laboratoire</option><option>Sport</option><option>Arts</option></select>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Salle ajoutée','success')}>➕ Ajouter Salle</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:14}}>
          {rooms.map((r, i) => {
            const cfg = statusConfig[r.status];
            return (
              <div key={i} style={{background:'var(--primary)',borderRadius:10,padding:16,borderTop:`3px solid ${r.color}`,border:'1px solid var(--border)',transition:'all .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.borderTopColor=r.color;}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                  <strong style={{fontSize:14}}>{r.name}</strong>
                  <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:6}}>
                  {r.type} • Capacité : {r.capacity}
                </div>
                <div style={{fontSize:12,marginBottom: r.until||r.note ? 4 : 12}}>{r.equip}</div>
                {r.until && <div style={{fontSize:11,color:'#f59e0b',marginBottom:12}}>Occupée jusqu'à {r.until}</div>}
                {r.note && <div style={{fontSize:11,color:'#ef4444',marginBottom:12}}>{r.note}</div>}
                {!r.until && !r.note && <div style={{marginBottom:12}} />}
                <button className={`btn ${cfg.btn} btn-sm`} style={{width:'100%'}} onClick={()=>showToast(`${r.name} — ${cfg.btnLabel.replace(/📅|📋|🔧/,'').trim()}`,'success')}>
                  {cfg.btnLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
