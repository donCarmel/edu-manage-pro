import { useState } from 'react';
import { students } from '../../data/mockData';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function Students({ showToast }) {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ name: '', class: '5A', level: 'Cinquième', phone: '', email: '', parent: '' });

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Total Élèves</span><span className="stat-icon">👨‍🎓</span></div><div className="stat-value">1 254</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Actifs</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">1 238</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Nouveaux ce mois</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>🆕</span></div><div className="stat-value">12</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">En difficulté</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>⚠️</span></div><div className="stat-value">47</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Liste des Élèves</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <input className="form-input" placeholder="🔍 Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:200}} />
            <select className="form-select" style={{width:'auto'}}><option>Toutes les classes</option><option>5A</option><option>6B</option><option>4C</option><option>3A</option></select>
            <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Export Excel généré','success')}>📤 Exporter</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setAddOpen(true)}>➕ Nouvel Élève</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Élève</th><th>Classe</th><th>Niveau</th><th>Moyenne</th><th>Présence</th><th>Statut</th><th>Contact Parent</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div className="avatar" style={{background:s.color}}>{s.initials}</div>
                      <div>
                        <div style={{fontWeight:600}}>{s.name}</div>
                        <div style={{fontSize:11,color:'var(--text-muted)'}}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.class}</td>
                  <td>{s.level}</td>
                  <td><span style={{color: s.avg>=14?'#10b981':s.avg>=10?'#f59e0b':'#ef4444',fontWeight:600}}>{s.avg}/20</span></td>
                  <td>
                    <div style={{minWidth:80}}>
                      <div style={{fontSize:12,marginBottom:3}}>{s.attendance}%</div>
                      <div className="progress-bar"><div className="progress-fill" style={{width:`${s.attendance}%`,background:s.attendance>=90?'var(--success)':s.attendance>=70?'var(--warning)':'var(--danger)'}} /></div>
                    </div>
                  </td>
                  <td><span className={`badge ${s.status==='active'?'badge-success':'badge-warning'}`}>{s.status==='active'?'Actif':'Attention'}</span></td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.parent} · {s.phone}</td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast(`Profil de ${s.name} ouvert`,'success')} title="Voir">👁️</div>
                      <div className="action-btn" onClick={()=>showToast(`Édition de ${s.name}`,'success')} title="Modifier">✏️</div>
                      <div className="action-btn" onClick={()=>setDeleteTarget(s.name)} title="Supprimer">🗑️</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14,paddingTop:12,borderTop:'1px solid var(--border)'}}>
          <span style={{fontSize:12,color:'var(--text-muted)'}}>Affichage {filtered.length} sur {students.length}</span>
          <div style={{display:'flex',gap:6}}>
            <button className="btn btn-secondary btn-sm">‹ Préc.</button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-secondary btn-sm">Suiv. ›</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={addOpen}
        onClose={()=>setAddOpen(false)}
        title="➕ Ajouter un Élève"
        footer={<>
          <button className="btn btn-secondary" onClick={()=>setAddOpen(false)}>Annuler</button>
          <button className="btn btn-primary" onClick={()=>{setAddOpen(false);showToast('Élève ajouté avec succès','success');}}>Enregistrer</button>
        </>}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Nom complet *</label>
            <input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Ex: Jean Dupont" />
          </div>
          <div className="form-group">
            <label className="form-label">Classe *</label>
            <select className="form-select" value={form.class} onChange={e=>setForm({...form,class:e.target.value})}>
              <option>5A</option><option>6B</option><option>4C</option><option>3A</option><option>6A</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="prenom.nom@edu.fr" />
          </div>
          <div className="form-group">
            <label className="form-label">Téléphone parent</label>
            <input className="form-input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="06 XX XX XX XX" />
          </div>
          <div className="form-group" style={{gridColumn:'1/-1'}}>
            <label className="form-label">Nom du parent / tuteur</label>
            <input className="form-input" value={form.parent} onChange={e=>setForm({...form,parent:e.target.value})} placeholder="Nom du responsable légal" />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={()=>setDeleteTarget(null)}
        onConfirm={()=>showToast('Élève supprimé','danger')}
        target={`l'élève ${deleteTarget}`}
      />
    </div>
  );
}
