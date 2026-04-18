import { useState } from 'react';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';

const hrTabs = [
  { id: 'staff', label: '👥 Personnel' },
  { id: 'recrutement', label: '🔍 Recrutement' },
  { id: 'conges', label: '🏖️ Congés' },
  { id: 'formation', label: '📚 Formations' },
  { id: 'evaluation', label: '⭐ Évaluations' },
];

export default function HR({ showToast }) {
  const [tab, setTab] = useState('staff');
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const staff = [
    { name: 'Pierre Martin', initials: 'PM', color: 'linear-gradient(135deg,#3b82f6,#6366f1)', role: 'Professeur', dept: 'Mathématiques', contract: 'CDI', seniority: '8 ans', status: 'active' },
    { name: 'Sophie Dubois', initials: 'SD', color: 'linear-gradient(135deg,#10b981,#34d399)', role: 'Professeur', dept: 'Français', contract: 'CDI', seniority: '12 ans', status: 'active' },
    { name: 'Anne Richard', initials: 'AR', color: 'linear-gradient(135deg,#f59e0b,#fbbf24)', role: 'Secrétaire', dept: 'Administration', contract: 'CDI', seniority: '5 ans', status: 'active' },
    { name: 'Marc Beaumont', initials: 'MB', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', role: 'Agent d\'entretien', dept: 'Logistique', contract: 'CDD', seniority: '2 ans', status: 'active' },
    { name: 'Claire Moreau', initials: 'CM', color: 'linear-gradient(135deg,#ef4444,#f87171)', role: 'Infirmière', dept: 'Santé', contract: 'CDI', seniority: '6 ans', status: 'leave' },
  ];

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Total Personnel</span><span className="stat-icon">👥</span></div><div className="stat-value">124</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">En Activité</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">118</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">En Congé</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>🏖️</span></div><div className="stat-value">4</div></div>
        <div className="stat-card purple"><div className="stat-header"><span className="stat-title">Postes Ouverts</span><span className="stat-icon" style={{background:'rgba(139,92,246,.1)',color:'#8b5cf6'}}>🔍</span></div><div className="stat-value">6</div></div>
      </div>

      <div className="tab-bar">
        {hrTabs.map(t => (
          <div key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</div>
        ))}
      </div>

      {/* Personnel */}
      {tab === 'staff' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Liste du Personnel</h3>
            <div style={{display:'flex',gap:8}}>
              <input className="form-input" placeholder="🔍 Rechercher..." style={{width:200}} />
              <button className="btn btn-primary btn-sm" onClick={()=>setAddOpen(true)}>➕ Ajouter Employé</button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Employé</th><th>Rôle</th><th>Département</th><th>Contrat</th><th>Ancienneté</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {staff.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div className="avatar" style={{background:s.color}}>{s.initials}</div>
                        <strong>{s.name}</strong>
                      </div>
                    </td>
                    <td>{s.role}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.dept}</td>
                    <td><span className={`badge ${s.contract==='CDI'?'badge-success':'badge-warning'}`}>{s.contract}</span></td>
                    <td style={{fontSize:12}}>{s.seniority}</td>
                    <td><span className={`badge ${s.status==='active'?'badge-success':'badge-warning'}`}>{s.status==='active'?'Actif':'En congé'}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast(`Profil ${s.name}`,'success')}>👁️</div>
                        <div className="action-btn" onClick={()=>showToast('Édition...','success')}>✏️</div>
                        <div className="action-btn" onClick={()=>setDeleteTarget(s.name)}>🗑️</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recrutement */}
      {tab === 'recrutement' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Postes Ouverts & Candidatures</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Poste publié','success')}>➕ Publier Poste</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {title:'Professeur de Mathématiques',type:'CDI',candidates:8,status:'active',date:'01 Mar 2026'},
              {title:'Agent de Sécurité',type:'CDI',candidates:12,status:'active',date:'15 Fév 2026'},
              {title:'Professeur d\'EPS',type:'CDD',candidates:5,status:'review',date:'10 Fév 2026'},
              {title:'Secrétaire Administrative',type:'CDI',candidates:18,status:'closed',date:'01 Fév 2026'},
            ].map((j,i)=>(
              <div key={i} style={{background:'var(--primary)',border:'1px solid var(--border)',borderRadius:8,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{j.title}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>Publié le {j.date} · {j.candidates} candidatures reçues</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span className={`badge ${j.type==='CDI'?'badge-success':'badge-info'}`}>{j.type}</span>
                  <span className={`badge ${j.status==='active'?'badge-success':j.status==='review'?'badge-warning':'badge-danger'}`}>{j.status==='active'?'Ouvert':j.status==='review'?'En cours':'Clôturé'}</span>
                  <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Candidatures chargées','success')}>Voir ({j.candidates})</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Congés */}
      {tab === 'conges' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Demandes de Congés</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Demande ajoutée','success')}>➕ Nouvelle Demande</button>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Employé</th><th>Type</th><th>Début</th><th>Fin</th><th>Jours</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {name:'Claire Moreau',initials:'CM',color:'linear-gradient(135deg,#ef4444,#f87171)',type:'Congé annuel',start:'10 Mar 2026',end:'21 Mar 2026',days:10,status:'approved'},
                  {name:'Pierre Martin',initials:'PM',color:'linear-gradient(135deg,#3b82f6,#6366f1)',type:'Congé maladie',start:'05 Mar 2026',end:'07 Mar 2026',days:3,status:'approved'},
                  {name:'Sophie Dubois',initials:'SD',color:'linear-gradient(135deg,#10b981,#34d399)',type:'Congé annuel',start:'01 Avr 2026',end:'10 Avr 2026',days:8,status:'pending'},
                  {name:'Marc Beaumont',initials:'MB',color:'linear-gradient(135deg,#6366f1,#8b5cf6)',type:'Congé exceptionnel',start:'20 Mar 2026',end:'20 Mar 2026',days:1,status:'pending'},
                ].map((c,i)=>(
                  <tr key={i}>
                    <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="avatar" style={{background:c.color}}>{c.initials}</div>{c.name}</div></td>
                    <td style={{fontSize:12}}>{c.type}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.start}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{c.end}</td>
                    <td style={{fontWeight:700}}>{c.days}j</td>
                    <td><span className={`badge ${c.status==='approved'?'badge-success':'badge-warning'}`}>{c.status==='approved'?'Approuvé':'En attente'}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Approuvé','success')} style={{color:'#10b981'}}>✅</div>
                        <div className="action-btn" onClick={()=>showToast('Refusé','danger')} style={{color:'#ef4444'}}>❌</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Formations */}
      {tab === 'formation' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Plan de Formation</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Formation ajoutée','success')}>➕ Ajouter Formation</button>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Formation</th><th>Domaine</th><th>Participants</th><th>Date</th><th>Organisme</th><th>Coût</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {name:'Pédagogie Numérique',domain:'Informatique',participants:'12 profs',date:'15 Mar 2026',org:'CNED',cost:'€ 1 200',status:'confirmed'},
                  {name:'Premiers Secours PSC1',domain:'Santé',participants:'20 agents',date:'22 Mar 2026',org:'Croix-Rouge',cost:'€ 800',status:'confirmed'},
                  {name:'Management Équipe',domain:'RH',participants:'4 chefs dept.',date:'05 Avr 2026',org:'Cegos',cost:'€ 2 400',status:'pending'},
                  {name:'Excel & Outils Admin',domain:'Informatique',participants:'5 admins',date:'10 Avr 2026',org:'ENI Formation',cost:'€ 750',status:'pending'},
                ].map((f,i)=>(
                  <tr key={i}>
                    <td><strong>{f.name}</strong></td>
                    <td style={{fontSize:12}}>{f.domain}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{f.participants}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{f.date}</td>
                    <td style={{fontSize:12}}>{f.org}</td>
                    <td style={{fontWeight:600}}>{f.cost}</td>
                    <td><span className={`badge ${f.status==='confirmed'?'badge-success':'badge-warning'}`}>{f.status==='confirmed'?'Confirmée':'À confirmer'}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Formation confirmée','success')}>✅</div>
                        <div className="action-btn" onClick={()=>showToast('Formation supprimée','danger')}>🗑️</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Évaluations */}
      {tab === 'evaluation' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Évaluations Annuelles du Personnel</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Évaluation ajoutée','success')}>➕ Nouvelle Évaluation</button>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Employé</th><th>Évaluateur</th><th>Période</th><th>Compétences</th><th>Ponctualité</th><th>Investissement</th><th>Note Finale</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {name:'Pierre Martin',initials:'PM',color:'linear-gradient(135deg,#3b82f6,#6366f1)',eval:'Dir. Dupont',period:'2024–2025',skills:5,punctuality:5,invest:5,note:'5.0 / 5 — Excellent',badge:'badge-success'},
                  {name:'Sophie Dubois',initials:'SD',color:'linear-gradient(135deg,#10b981,#34d399)',eval:'Dir. Dupont',period:'2024–2025',skills:5,punctuality:4,invest:5,note:'4.7 / 5 — Très Bien',badge:'badge-success'},
                  {name:'Anne Richard',initials:'AR',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',eval:'Dir. Dupont',period:'2024–2025',skills:4,punctuality:4,invest:4,note:'4.0 / 5 — Bien',badge:'badge-info'},
                  {name:'Marc Beaumont',initials:'MB',color:'linear-gradient(135deg,#6366f1,#8b5cf6)',eval:'Dir. Dupont',period:'2024–2025',skills:3,punctuality:4,invest:3,note:'3.3 / 5 — Satisfaisant',badge:'badge-warning'},
                ].map((e,i)=>(
                  <tr key={i}>
                    <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="avatar" style={{background:e.color,width:28,height:28,fontSize:10}}>{e.initials}</div>{e.name}</div></td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{e.eval}</td>
                    <td style={{fontSize:12}}>{e.period}</td>
                    <td>{'⭐'.repeat(e.skills)}</td>
                    <td>{'⭐'.repeat(e.punctuality)}</td>
                    <td>{'⭐'.repeat(e.invest)}</td>
                    <td><span className={`badge ${e.badge}`}>{e.note}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Rapport ouvert','success')}>📄</div>
                        <div className="action-btn" onClick={()=>showToast('Édition...','success')}>✏️</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="➕ Ajouter un Employé"
        footer={<><button className="btn btn-secondary" onClick={()=>setAddOpen(false)}>Annuler</button><button className="btn btn-primary" onClick={()=>{setAddOpen(false);showToast('Employé ajouté','success');}}>Enregistrer</button></>}>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Nom complet *</label><input className="form-input" placeholder="Prénom Nom" /></div>
          <div className="form-group"><label className="form-label">Rôle *</label><select className="form-select"><option>Professeur</option><option>Administratif</option><option>Agent d'entretien</option><option>Infirmier(e)</option><option>Sécurité</option></select></div>
          <div className="form-group"><label className="form-label">Département</label><input className="form-input" placeholder="Ex: Mathématiques" /></div>
          <div className="form-group"><label className="form-label">Type de contrat</label><select className="form-select"><option>CDI</option><option>CDD</option><option>Stagiaire</option></select></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="prenom.nom@edu.fr" /></div>
          <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" placeholder="06 XX XX XX XX" /></div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={()=>showToast('Employé supprimé','danger')} target={`l'employé ${deleteTarget}`} />
    </div>
  );
}
