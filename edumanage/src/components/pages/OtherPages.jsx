import { useState } from 'react';
import { books, supplies } from '../../data/mockData';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';

/* ══════════════ LIBRARY ══════════════ */
export function Library({ showToast }) {
  const [libTab, setLibTab] = useState('catalog');
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Total Livres</span><span className="stat-icon">📚</span></div><div className="stat-value">4 820</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Disponibles</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">3 654</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Empruntés</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>📤</span></div><div className="stat-value">1 166</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">En Retard</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>⚠️</span></div><div className="stat-value">34</div></div>
      </div>

      <div className="tab-bar">
        {[{id:'catalog',label:'📚 Catalogue'},{id:'loans',label:'📤 Emprunts'},{id:'overdue',label:'⚠️ Retards'}].map(t=>(
          <div key={t.id} className={`tab ${libTab===t.id?'active':''}`} onClick={()=>setLibTab(t.id)}>{t.label}</div>
        ))}
      </div>

      {libTab === 'catalog' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Catalogue des Livres</h3>
            <div style={{display:'flex',gap:8}}>
              <input className="form-input" placeholder="🔍 Rechercher un livre..." style={{width:200}} />
              <button className="btn btn-primary btn-sm" onClick={()=>showToast('Ajout livre','success')}>➕ Ajouter Livre</button>
            </div>
          </div>
          <div className="book-grid">
            {books.map(b => (
              <div key={b.id} className="book-card">
                <div className="book-cover" style={{background:b.color}}>{b.icon}</div>
                <div className="book-title">{b.title}</div>
                <div className="book-author">{b.author} · {b.subject}</div>
                <div className="book-meta">
                  <span className={`badge ${b.available>0?'badge-success':'badge-danger'}`}>
                    {b.available>0?`${b.available} dispo`:'Épuisé'}
                  </span>
                  <span style={{fontSize:11,color:'var(--text-muted)'}}>{b.available}/{b.total}</span>
                </div>
                <button className="btn btn-primary btn-sm" style={{width:'100%',marginTop:10}} onClick={()=>showToast(`Emprunt de "${b.title}" enregistré`,'success')} disabled={b.available===0}>
                  {b.available>0?'📤 Emprunter':'Indisponible'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {libTab === 'loans' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Emprunts en Cours</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Nouvel emprunt','success')}>➕ Nouvel Emprunt</button>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Livre</th><th>Emprunteur</th><th>Classe</th><th>Date Emprunt</th><th>Retour Prévu</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {book:'Algèbre Linéaire',icon:'📘',borrower:'Alice Dubois',initials:'AD',class:'5A',borrowed:'01 Mar 2026',due:'15 Mar 2026',status:'ok'},
                  {book:'La Fontaine — Fables',icon:'📗',borrower:'Baptiste Martin',initials:'BM',class:'6B',borrowed:'20 Fév 2026',due:'06 Mar 2026',status:'overdue'},
                  {book:'Histoire de France',icon:'📕',borrower:'Emma Bernard',initials:'EB',class:'5B',borrowed:'25 Fév 2026',due:'11 Mar 2026',status:'ok'},
                  {book:'English Grammar',icon:'📓',borrower:'David Rousseau',initials:'DR',class:'3A',borrowed:'10 Fév 2026',due:'24 Fév 2026',status:'overdue'},
                ].map((l,i)=>(
                  <tr key={i}>
                    <td><div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:20}}>{l.icon}</span><strong>{l.book}</strong></div></td>
                    <td style={{fontSize:12}}>{l.borrower}</td>
                    <td>{l.class}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{l.borrowed}</td>
                    <td style={{fontSize:12,color:l.status==='overdue'?'#ef4444':'var(--text-muted)'}}>{l.due}</td>
                    <td><span className={`badge ${l.status==='ok'?'badge-success':'badge-danger'}`}>{l.status==='ok'?'En cours':'En retard'}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Retour enregistré','success')}>↩️</div>
                        <div className="action-btn" onClick={()=>showToast('Rappel envoyé','success')}>📧</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {libTab === 'overdue' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Livres en Retard (34)</h3>
            <button className="btn btn-warning btn-sm" onClick={()=>showToast('Rappels envoyés à tous','success')}>📧 Envoyer Tous Rappels</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {book:'La Fontaine — Fables',borrower:'Baptiste Martin',days:7,fine:'€ 3.50'},
              {book:'English Grammar',borrower:'David Rousseau',days:19,fine:'€ 9.50'},
              {book:'Chimie Organique',borrower:'Camille Lefebvre',days:12,fine:'€ 6.00'},
            ].map((item,i)=>(
              <div key={i} style={{background:'rgba(239,68,68,.05)',border:'1px solid rgba(239,68,68,.2)',borderRadius:8,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{item.book}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>Emprunté par {item.borrower} · {item.days} jours de retard</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{textAlign:'center'}}><div style={{fontSize:18,fontWeight:700,color:'#ef4444'}}>{item.fine}</div><div style={{fontSize:10,color:'var(--text-muted)'}}>Amende</div></div>
                  <button className="btn btn-warning btn-sm" onClick={()=>showToast('Rappel envoyé','success')}>📧</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════ TRANSPORT ══════════════ */
export function Transport({ showToast }) {
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Total Bus</span><span className="stat-icon">🚌</span></div><div className="stat-value">12</div></div>
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">En Service</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✓</span></div><div className="stat-value">11</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Élèves Transportés</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>👨‍🎓</span></div><div className="stat-value">487</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Coût Mensuel</span><span className="stat-icon">💰</span></div><div className="stat-value">€ 8 500</div></div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Lignes de Transport</h3>
          <button className="btn btn-primary btn-sm" onClick={()=>showToast('Nouvelle ligne ajoutée','success')}>➕ Ajouter Ligne</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {[
            {num:'Bus 01',driver:'Jean Dupré',plate:'AB-123-CD',students:42,capacity:55,status:'active',stops:['Terminus Centre','Place de la Mairie','Lycée Nord','École Principale']},
            {num:'Bus 02',driver:'Marie Leblanc',plate:'EF-456-GH',students:38,capacity:55,status:'active',stops:['Quartier Est','Résidence Fleurie','Boulevard Central','École Principale']},
            {num:'Bus 03',driver:'Pierre Garnier',plate:'IJ-789-KL',students:45,capacity:55,status:'active',stops:['Zone Industrielle','Collège Ouest','Avenue des Écoles','École Principale']},
            {num:'Bus 04',driver:'Lucie Morel',plate:'MN-012-OP',students:0,capacity:55,status:'maintenance',stops:['Route Sud','Village de Rosny','Cité des Lilas','École Principale']},
          ].map((bus,i)=>(
            <div key={i} style={{background:'var(--primary)',border:'1px solid var(--border)',borderRadius:10,padding:18,transition:'all .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <div style={{fontSize:22,fontWeight:700}}>{bus.num}</div>
                <span className={`badge ${bus.status==='active'?'badge-success':'badge-warning'}`}>{bus.status==='active'?'En service':'Maintenance'}</span>
              </div>
              <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:4}}>🚗 {bus.driver} · {bus.plate}</div>
              <div style={{fontSize:12,marginBottom:12}}>
                <span style={{color:'#10b981',fontWeight:600}}>{bus.students}</span>
                <span style={{color:'var(--text-muted)'}}> / {bus.capacity} élèves</span>
              </div>
              <div className="progress-bar" style={{marginBottom:12}}>
                <div className="progress-fill" style={{width:`${(bus.students/bus.capacity)*100}%`,background:'#3b82f6'}} />
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:14}}>
                {bus.stops.map((stop,j)=>(
                  <div key={j} style={{display:'flex',alignItems:'center',gap:8,fontSize:11}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:j===bus.stops.length-1?'#10b981':'#3b82f6',flexShrink:0}} />
                    <span style={{color:j===bus.stops.length-1?'#10b981':'var(--text-muted)'}}>{stop}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary btn-sm" style={{width:'100%'}} onClick={()=>showToast(`Détails ${bus.num} chargés`,'success')}>Voir Détails</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ CANTEEN ══════════════ */
export function Canteen({ showToast }) {
  const [canteenTab, setCanteenTab] = useState('menu');
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Inscrits Cantine</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>🍽️</span></div><div className="stat-value">876</div><div className="stat-change positive">69.9% des élèves</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Repas Aujourd'hui</span><span className="stat-icon">📊</span></div><div className="stat-value">854</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Régimes Spéciaux</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⚠️</span></div><div className="stat-value">42</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Recette Mensuelle</span><span className="stat-icon">💰</span></div><div className="stat-value">€ 58 200</div></div>
      </div>

      <div className="tab-bar">
        {[{id:'menu',label:'🍽️ Menu'},{id:'inscrits',label:'📋 Inscrits'},{id:'stats',label:'📊 Statistiques'}].map(t=>(
          <div key={t.id} className={`tab ${canteenTab===t.id?'active':''}`} onClick={()=>setCanteenTab(t.id)}>{t.label}</div>
        ))}
      </div>

      {canteenTab === 'menu' && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:16}}>
          {[
            {day:'Lundi 16 Mars',entree:'Salade Niçoise',plat:'Poulet Rôti + Haricots verts',dessert:'Yaourt nature',vegan:'Ratatouille',cal:720},
            {day:'Mardi 17 Mars',entree:'Soupe de légumes',plat:'Saumon + Riz pilaf',dessert:'Fruit de saison',vegan:'Tofu grillé + légumes',cal:680},
            {day:'Mercredi 18 Mars',entree:'Crudités assorties',plat:'Hachis Parmentier',dessert:'Compote de pommes',vegan:'Gratin de légumes',cal:750},
            {day:'Jeudi 19 Mars',entree:'Potage maison',plat:'Côte de porc + Purée',dessert:'Tarte aux fruits',vegan:'Lentilles du Puy',cal:800},
            {day:'Vendredi 20 Mars',entree:'Salade verte',plat:'Poisson pané + Frites',dessert:'Mousse au chocolat',vegan:'Pizza végétarienne',cal:760},
          ].map((m,i)=>(
            <div key={i} style={{background:'var(--primary)',border:'1px solid var(--border)',borderRadius:10,padding:18,transition:'all .3s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:'var(--accent)'}}>{m.day}</div>
              <div style={{fontSize:12,marginBottom:8}}><span style={{color:'var(--text-muted)'}}>🥗 Entrée : </span>{m.entree}</div>
              <div style={{fontSize:12,marginBottom:8}}><span style={{color:'var(--text-muted)'}}>🍖 Plat : </span>{m.plat}</div>
              <div style={{fontSize:12,marginBottom:8}}><span style={{color:'var(--text-muted)'}}>🌱 Vegan : </span>{m.vegan}</div>
              <div style={{fontSize:12,marginBottom:12}}><span style={{color:'var(--text-muted)'}}>🍮 Dessert : </span>{m.dessert}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="badge badge-info">~{m.cal} kcal</span>
                <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Menu modifié','success')}>✏️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {canteenTab === 'inscrits' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Élèves Inscrits à la Cantine</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Inscription ajoutée','success')}>➕ Inscrire Élève</button>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Élève</th><th>Classe</th><th>Régime</th><th>Jours</th><th>Tarif Mensuel</th><th>Statut Paiement</th></tr></thead>
              <tbody>
                {[
                  {name:'Alice Dubois',class:'5A',regime:'Standard',days:'Lun–Ven',tarif:'€ 75',paid:true},
                  {name:'Baptiste Martin',class:'6B',regime:'Standard',days:'Lun–Jeu',tarif:'€ 60',paid:false},
                  {name:'Camille Lefebvre',class:'4C',regime:'Sans gluten',days:'Lun–Ven',tarif:'€ 80',paid:true},
                  {name:'Emma Bernard',class:'5B',regime:'Standard',days:'Mar–Ven',tarif:'€ 60',paid:true},
                ].map((s,i)=>(
                  <tr key={i}>
                    <td style={{fontWeight:600}}>{s.name}</td>
                    <td>{s.class}</td>
                    <td>{s.regime==='Sans gluten'?<span className="badge badge-warning">{s.regime}</span>:s.regime}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.days}</td>
                    <td style={{fontWeight:600}}>{s.tarif}</td>
                    <td><span className={`badge ${s.paid?'badge-success':'badge-warning'}`}>{s.paid?'Payé':'En attente'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {canteenTab === 'stats' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div className="card" style={{marginBottom:0}}>
            <div className="card-header"><h3 className="card-title">Fréquentation par Jour</h3></div>
            {[{day:'Lundi',count:854,max:876},{day:'Mardi',count:820,max:876},{day:'Mercredi',count:342,max:876},{day:'Jeudi',count:840,max:876},{day:'Vendredi',count:810,max:876}].map(d=>(
              <div key={d.day} style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:13}}>
                  <span>{d.day}</span>
                  <span style={{fontWeight:600}}>{d.count} repas</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${(d.count/d.max)*100}%`}} /></div>
              </div>
            ))}
          </div>
          <div className="card" style={{marginBottom:0}}>
            <div className="card-header"><h3 className="card-title">Régimes Alimentaires</h3></div>
            {[{label:'Standard',count:810,pct:93,color:'#3b82f6'},{label:'Végétarien',count:34,pct:4,color:'#10b981'},{label:'Sans gluten',count:18,pct:2,color:'#f59e0b'},{label:'Halal',count:14,pct:1,color:'#8b5cf6'}].map(r=>(
              <div key={r.label} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:13}}>
                  <span>{r.label}</span>
                  <span style={{fontSize:12,color:'var(--text-muted)'}}>{r.count} élèves ({r.pct}%)</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${r.pct}%`,background:r.color}} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════ SUPPLIES ══════════════ */
export function Supplies({ showToast }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const statusBadge = { ok:'badge-success', low:'badge-warning', critical:'badge-danger' };
  const statusLabel = { ok:'OK', low:'⚠️ Bas', critical:'⚠️ Critique' };

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Articles en Stock</span><span className="stat-icon">📦</span></div><div className="stat-value">248</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Alertes Stock Faible</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⚠️</span></div><div className="stat-value">8</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Commandes en Cours</span><span className="stat-icon">🛒</span></div><div className="stat-value">3</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Budget Restant</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>💰</span></div><div className="stat-value">€ 8 160</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:20}}>
        <div className="card" style={{marginBottom:0}}>
          <div className="card-header">
            <h3 className="card-title">Gestion des Stocks</h3>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <select className="form-select" style={{width:'auto'}}><option>Toutes catégories</option><option>Papeterie</option><option>Nettoyage</option><option>Pédagogique</option><option>Bureautique</option></select>
              <button className="btn btn-warning btn-sm" onClick={()=>showToast('Commande urgente créée','success')}>⚡ Réappro Urgente</button>
              <button className="btn btn-primary btn-sm" onClick={()=>showToast('Article ajouté','success')}>➕ Ajouter Article</button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Article</th><th>Catégorie</th><th>Actuel</th><th>Min.</th><th>Max.</th><th>Unité</th><th>Prix Unit.</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {supplies.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.category}</td>
                    <td style={{fontWeight:700,color:s.status!=='ok'?'#ef4444':'inherit'}}>{s.current}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.min}</td>
                    <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.max}</td>
                    <td style={{fontSize:12}}>{s.unit}</td>
                    <td>€ {s.price.toFixed(2)}</td>
                    <td><span className={`badge ${statusBadge[s.status]}`}>{statusLabel[s.status]}</span></td>
                    <td>
                      <div className="action-menu">
                        <div className="action-btn" onClick={()=>showToast('Commande créée','success')} title="Commander">🛒</div>
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

        <div>
          <div className="card">
            <div className="card-header"><h3 className="card-title">Commandes en Cours</h3><button className="btn btn-primary btn-sm" onClick={()=>showToast('Commander','success')}>➕</button></div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {supplier:'Papeterie Express',items:'Ramettes x100, Stylos x5 lots',status:'warning',statusLabel:'En transit',delivery:'05 Mar 2026',amount:'€ 470'},
                {supplier:'TechStore Pro',items:'Cartouches HP x20',status:'info',statusLabel:'Confirmée',delivery:'08 Mar 2026',amount:'€ 480'},
                {supplier:'CleanSupply SARL',items:'Nettoyants x30 bidons',status:'success',statusLabel:'Livrée',delivery:'01 Mar 2026',amount:'€ 267'},
              ].map((cmd,i)=>(
                <div key={i} style={{background:'var(--primary)',borderRadius:8,padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:13,fontWeight:600}}>{cmd.supplier}</span>
                    <span className={`badge badge-${cmd.status}`}>{cmd.statusLabel}</span>
                  </div>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>{cmd.items}</div>
                  <div style={{fontSize:11,color:'var(--accent)',marginTop:4}}>Livraison : {cmd.delivery} · {cmd.amount}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{marginBottom:0}}>
            <div className="card-header"><h3 className="card-title">Alertes Stock</h3></div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {supplies.filter(s=>s.status!=='ok').map(s=>(
                <div key={s.id} style={{background:s.status==='critical'?'rgba(239,68,68,.1)':'rgba(245,158,11,.1)',borderLeft:`3px solid ${s.status==='critical'?'#ef4444':'#f59e0b'}`,borderRadius:6,padding:10}}>
                  <div style={{fontSize:12,fontWeight:600,color:s.status==='critical'?'#ef4444':'#f59e0b'}}>{s.status==='critical'?'Critique':'Bas'}</div>
                  <div style={{fontSize:12}}>{s.name} : {s.current} / {s.min} min</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={()=>showToast('Article supprimé','danger')} target={`l'article ${deleteTarget}`} />
    </div>
  );
}
