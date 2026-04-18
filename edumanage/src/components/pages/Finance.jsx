import { useState, useEffect, useRef } from 'react';
import { transactions } from '../../data/mockData';
import Modal from '../ui/Modal';

function drawBudgetPie(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement?.offsetWidth - 44 || 250;
  canvas.height = 200;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2, r = Math.min(W, H) / 2 - 20;
  const data = [45, 25, 15, 10, 5];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  const total = data.reduce((a, b) => a + b, 0);
  let start = -Math.PI / 2;
  data.forEach((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = colors[i]; ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2; ctx.stroke();
    start += angle;
  });
}

export default function Finance({ showToast }) {
  const [tab, setTab] = useState('transactions');
  const [addOpen, setAddOpen] = useState(false);
  const pieRef = useRef(null);

  useEffect(() => {
    if (tab === 'transactions' && pieRef.current) {
      setTimeout(() => drawBudgetPie(pieRef.current), 100);
    }
  }, [tab]);

  const tabs = [
    { id: 'transactions', label: '💳 Transactions' },
    { id: 'salaires', label: '💼 Salaires' },
    { id: 'budget', label: '📊 Budget' },
    { id: 'frais', label: '🎓 Frais Scolarité' },
  ];

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Revenus Totaux</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>💰</span></div><div className="stat-value">€ 487 350</div><div className="stat-change positive">↑ 8.2% vs mois dernier</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Dépenses</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>💸</span></div><div className="stat-value">€ 312 890</div><div className="stat-change negative">↑ 2.1%</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Bénéfice Net</span><span className="stat-icon">📈</span></div><div className="stat-value">€ 174 460</div><div className="stat-change positive">↑ 5.4%</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Paiements Dus</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⏰</span></div><div className="stat-value">€ 23 450</div><div className="stat-change negative">8 dossiers</div></div>
      </div>

      <div className="tab-bar">
        {tabs.map(t => (
          <div key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>

      {tab === 'transactions' && (
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:20}}>
          <div className="card" style={{marginBottom:0}}>
            <div className="card-header">
              <h3 className="card-title">Transactions Récentes</h3>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <select className="form-select" style={{width:'auto'}}><option value="">Tous types</option><option>Revenu</option><option>Dépense</option></select>
                <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Export Excel généré','success')}>📤 Exporter</button>
                <button className="btn btn-primary btn-sm" onClick={()=>setAddOpen(true)}>➕ Nouvelle Transaction</button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>Date</th><th>Description</th><th>Catégorie</th><th>Type</th><th>Montant</th><th>Statut</th><th>Actions</th></tr></thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td style={{fontSize:12,color:'var(--text-muted)'}}>{t.date}</td>
                      <td style={{maxWidth:200,fontSize:13}}>{t.desc}</td>
                      <td style={{fontSize:12}}>{t.category}</td>
                      <td><span className={`badge ${t.type==='income'?'badge-success':'badge-danger'}`}>{t.type==='income'?'Revenu':'Dépense'}</span></td>
                      <td style={{color:t.type==='income'?'#10b981':'#ef4444',fontWeight:600}}>
                        {t.type==='income'?'+ ':'— '}€ {t.amount.toLocaleString()}
                      </td>
                      <td><span className={`badge ${t.status==='paid'||t.status==='received'?'badge-success':'badge-warning'}`}>{t.status==='paid'?'Payé':t.status==='received'?'Reçu':'En attente'}</span></td>
                      <td>
                        <div className="action-menu">
                          <div className="action-btn" onClick={()=>showToast('Reçu généré','success')} title="Reçu">🧾</div>
                          <div className="action-btn" onClick={()=>showToast('Email envoyé','success')} title="Email">📧</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14,paddingTop:12,borderTop:'1px solid var(--border)'}}>
              <span style={{fontSize:12,color:'var(--text-muted)'}}>Affichage 1–8 sur 1 247</span>
              <div style={{display:'flex',gap:6}}>
                <button className="btn btn-secondary btn-sm">‹ Préc.</button>
                <button className="btn btn-primary btn-sm">1</button>
                <button className="btn btn-secondary btn-sm">2</button>
                <button className="btn btn-secondary btn-sm">Suiv. ›</button>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{marginBottom:16}}>
              <div className="card-header"><h3 className="card-title">Répartition Budget</h3></div>
              <canvas ref={pieRef} style={{display:'block'}} />
              <div className="chart-legend" style={{justifyContent:'center',marginTop:12}}>
                {[['#3b82f6','Salaires 45%'],['#10b981','Infrastructure 25%'],['#f59e0b','Pédagogie 15%'],['#8b5cf6','Admin 10%'],['#ef4444','Autres 5%']].map(([c,l])=>(
                  <div className="legend-item" key={l}><div className="legend-dot" style={{background:c}} /><span style={{color:'var(--text-muted)',fontSize:11}}>{l}</span></div>
                ))}
              </div>
            </div>
            <div className="card" style={{marginBottom:0}}>
              <div className="card-header"><h3 className="card-title">Résumé Mensuel</h3></div>
              {[
                {label:'Frais scolarité',amount:'€ 185 400',pct:38,color:'#3b82f6'},
                {label:'Subventions État',amount:'€ 203 600',pct:42,color:'#10b981'},
                {label:'Cantine & Services',amount:'€ 58 200',pct:12,color:'#f59e0b'},
                {label:'Dons & Activités',amount:'€ 40 150',pct:8,color:'#8b5cf6'},
              ].map(item => (
                <div key={item.label} style={{marginBottom:14}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:13}}>
                    <span>{item.label}</span>
                    <span style={{fontWeight:600}}>{item.amount}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${item.pct}%`,background:item.color}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'salaires' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Gestion des Salaires</h3>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-success btn-sm" onClick={()=>showToast('Virements lancés','success')}>💳 Lancer Virements</button>
              <button className="btn btn-primary btn-sm" onClick={()=>showToast('Ajout employé','success')}>➕ Ajouter</button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Employé</th><th>Poste</th><th>Salaire Brut</th><th>Charges</th><th>Net</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {name:'Pierre Martin',initials:'PM',color:'linear-gradient(135deg,#3b82f6,#6366f1)',poste:'Prof. Mathématiques',brut:3500,charges:700,net:2800,paid:true},
                  {name:'Sophie Dubois',initials:'SD',color:'linear-gradient(135deg,#10b981,#34d399)',poste:'Prof. Français',brut:3500,charges:700,net:2800,paid:true},
                  {name:'Marc Bernard',initials:'MB',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',poste:'Prof. Sciences',brut:3200,charges:640,net:2560,paid:false},
                  {name:'Anne Laurent',initials:'AL',color:'linear-gradient(135deg,#6366f1,#8b5cf6)',poste:'Prof. Histoire-Géo',brut:3200,charges:640,net:2560,paid:true},
                ].map((emp,i) => (
                  <tr key={i}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div className="avatar" style={{background:emp.color}}>{emp.initials}</div>
                        <strong>{emp.name}</strong>
                      </div>
                    </td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{emp.poste}</td>
                    <td style={{fontWeight:600}}>€ {emp.brut.toLocaleString()}</td>
                    <td style={{color:'#ef4444'}}>€ {emp.charges}</td>
                    <td style={{color:'#10b981',fontWeight:700}}>€ {emp.net.toLocaleString()}</td>
                    <td><span className={`badge ${emp.paid?'badge-success':'badge-warning'}`}>{emp.paid?'Versé':'En attente'}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Bulletin de paie généré','success')}>📄</div>
                        <div className="action-btn" onClick={()=>showToast('Email envoyé','success')}>📧</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'budget' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Suivi Budgétaire 2025/2026</h3>
            <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Rapport exporté','success')}>📤 Rapport Annuel</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,marginBottom:20}}>
            {[{label:'Budget Total',val:'€ 580 000',color:'var(--accent)'},{label:'Dépensé',val:'€ 312 890',color:'#ef4444'},{label:'Restant',val:'€ 267 110',color:'#10b981'},{label:'% Utilisé',val:'53.9%',color:'#f59e0b'}].map(k=>(
              <div key={k.label} className="kpi"><div className="kpi-val" style={{color:k.color}}>{k.val}</div><div className="kpi-lbl">{k.label}</div></div>
            ))}
          </div>
          {[
            {cat:'Ressources Humaines',budget:260000,spent:140000},
            {cat:'Infrastructure & Bâtiments',budget:85000,spent:42000},
            {cat:'Matériel Pédagogique',budget:60000,spent:38000},
            {cat:'Transport Scolaire',budget:45000,spent:25000},
            {cat:'Cantine & Restauration',budget:55000,spent:30000},
            {cat:'Informatique & Numérique',budget:35000,spent:20000},
          ].map(item=>{
            const pct = Math.round((item.spent/item.budget)*100);
            return (
              <div key={item.cat} style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:13}}>
                  <span style={{fontWeight:600}}>{item.cat}</span>
                  <span style={{color:'var(--text-muted)',fontSize:12}}>€ {item.spent.toLocaleString()} / € {item.budget.toLocaleString()} ({pct}%)</span>
                </div>
                <div className="progress-bar" style={{height:10}}>
                  <div className="progress-fill" style={{width:`${pct}%`,background:pct>80?'#ef4444':pct>60?'#f59e0b':'#10b981'}} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'frais' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Frais de Scolarité</h3>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-warning btn-sm" onClick={()=>showToast('Rappels envoyés','success')}>📧 Envoyer Rappels</button>
              <button className="btn btn-primary btn-sm" onClick={()=>showToast('Paiement enregistré','success')}>➕ Enregistrer Paiement</button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Élève</th><th>Classe</th><th>Montant Dû</th><th>Payé</th><th>Reste</th><th>Échéance</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {name:'Alice Dubois',initials:'AD',color:'linear-gradient(135deg,#3b82f6,#6366f1)',class:'5A',due:1200,paid:1200,deadline:'01 Sep 2026',status:'paid'},
                  {name:'Baptiste Martin',initials:'BM',color:'linear-gradient(135deg,#10b981,#34d399)',class:'6B',due:1200,paid:600,deadline:'15 Mar 2026',status:'partial'},
                  {name:'Camille Lefebvre',initials:'CL',color:'linear-gradient(135deg,#f59e0b,#fbbf24)',class:'4C',due:1200,paid:0,deadline:'01 Mar 2026',status:'overdue'},
                  {name:'David Rousseau',initials:'DR',color:'linear-gradient(135deg,#6366f1,#8b5cf6)',class:'3A',due:1200,paid:1200,deadline:'01 Sep 2026',status:'paid'},
                ].map((s,i)=>(
                  <tr key={i}>
                    <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="avatar" style={{background:s.color}}>{s.initials}</div>{s.name}</div></td>
                    <td>{s.class}</td>
                    <td>€ {s.due.toLocaleString()}</td>
                    <td style={{color:'#10b981',fontWeight:600}}>€ {s.paid.toLocaleString()}</td>
                    <td style={{color:s.due-s.paid>0?'#ef4444':'#10b981',fontWeight:600}}>€ {(s.due-s.paid).toLocaleString()}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.deadline}</td>
                    <td><span className={`badge ${s.status==='paid'?'badge-success':s.status==='partial'?'badge-warning':'badge-danger'}`}>{s.status==='paid'?'Payé':s.status==='partial'?'Partiel':'En retard'}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Rappel envoyé','success')}>📧</div>
                        <div className="action-btn" onClick={()=>showToast('Reçu généré','success')}>🧾</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="➕ Nouvelle Transaction"
        footer={<><button className="btn btn-secondary" onClick={()=>setAddOpen(false)}>Annuler</button><button className="btn btn-primary" onClick={()=>{setAddOpen(false);showToast('Transaction enregistrée','success');}}>Enregistrer</button></>}>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Description *</label><input className="form-input" placeholder="Ex: Frais de scolarité" /></div>
          <div className="form-group"><label className="form-label">Type *</label><select className="form-select"><option>Revenu</option><option>Dépense</option></select></div>
          <div className="form-group"><label className="form-label">Montant (€) *</label><input className="form-input" type="number" placeholder="0.00" /></div>
          <div className="form-group"><label className="form-label">Catégorie</label><select className="form-select"><option>Scolarité</option><option>Salaires</option><option>Fournitures</option><option>Charges</option><option>Subventions</option></select></div>
          <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-03-15" /></div>
          <div className="form-group"><label className="form-label">Statut</label><select className="form-select"><option>Payé</option><option>En attente</option></select></div>
        </div>
      </Modal>
    </div>
  );
}
