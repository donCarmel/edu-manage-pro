import { useState } from 'react';
import { classes } from '../../data/mockData';
import Modal from '../ui/Modal';

export default function Classes({ showToast }) {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Total Classes</span><span className="stat-icon">🏫</span></div><div className="stat-value">42</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Actives</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">40</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Taux Remplissage</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>📊</span></div><div className="stat-value">89%</div></div>
        <div className="stat-card purple"><div className="stat-header"><span className="stat-title">Élèves / Classe</span><span className="stat-icon" style={{background:'rgba(139,92,246,.1)',color:'#8b5cf6'}}>👨‍🎓</span></div><div className="stat-value">29.9</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Liste des Classes</h3>
          <div style={{display:'flex',gap:8}}>
            <select className="form-select" style={{width:'auto'}}><option>Tous niveaux</option><option>Sixième</option><option>Cinquième</option><option>Quatrième</option><option>Troisième</option></select>
            <button className="btn btn-primary btn-sm" onClick={()=>setAddOpen(true)}>➕ Nouvelle Classe</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {classes.map(c => (
            <div key={c.id} style={{background:'var(--primary)',border:'1px solid var(--border)',borderRadius:10,padding:18,transition:'all .3s',cursor:'default'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:12}}>
                <div>
                  <h3 style={{fontSize:22,fontWeight:700}}>Classe {c.name}</h3>
                  <p style={{color:'var(--text-muted)',fontSize:12}}>{c.level}</p>
                </div>
                <span className={`badge ${c.status==='active'?'badge-success':'badge-warning'}`}>{c.status==='active'?'Actif':'Inactif'}</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:12}}>
                <div><div style={{fontSize:11,color:'var(--text-muted)'}}>Élèves</div><div style={{fontSize:20,fontWeight:700}}>{c.students}</div></div>
                <div><div style={{fontSize:11,color:'var(--text-muted)'}}>Capacité</div><div style={{fontSize:20,fontWeight:700}}>{c.capacity}</div></div>
                <div><div style={{fontSize:11,color:'var(--text-muted)'}}>Moy. générale</div><div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{c.avg}</div></div>
                <div><div style={{fontSize:11,color:'var(--text-muted)'}}>Présence</div><div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{c.attendance}%</div></div>
              </div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:5}}>Prof. Principal</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div className="avatar" style={{width:26,height:26,fontSize:10,background:c.teacherColor}}>{c.teacherInitials}</div>
                  <span style={{fontSize:13}}>{c.teacher}</span>
                </div>
              </div>
              <div style={{marginBottom:12}}>
                <div className="progress-bar" style={{height:6}}>
                  <div className="progress-fill" style={{width:`${(c.students/c.capacity)*100}%`}} />
                </div>
                <div style={{fontSize:10,color:'var(--text-muted)',marginTop:4}}>Taux remplissage : {Math.round((c.students/c.capacity)*100)}%</div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>showToast(`Détails Classe ${c.name} chargés`,'success')}>Voir Détails</button>
                <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Édition...','success')}>✏️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="➕ Nouvelle Classe"
        footer={<>
          <button className="btn btn-secondary" onClick={()=>setAddOpen(false)}>Annuler</button>
          <button className="btn btn-primary" onClick={()=>{setAddOpen(false);showToast('Classe créée','success');}}>Créer</button>
        </>}>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Nom de la classe *</label><input className="form-input" placeholder="Ex: 5C" /></div>
          <div className="form-group"><label className="form-label">Niveau *</label><select className="form-select"><option>Sixième</option><option>Cinquième</option><option>Quatrième</option><option>Troisième</option></select></div>
          <div className="form-group"><label className="form-label">Capacité max</label><input className="form-input" type="number" defaultValue={35} /></div>
          <div className="form-group"><label className="form-label">Prof. Principal</label><select className="form-select"><option>Prof. Martin</option><option>Prof. Dubois</option><option>Prof. Bernard</option></select></div>
        </div>
      </Modal>
    </div>
  );
}
