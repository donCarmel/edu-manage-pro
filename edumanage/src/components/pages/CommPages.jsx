import { useState } from 'react';
import { messages } from '../../data/mockData';

/* ══════════════ MESSAGES ══════════════ */
export function Messages({ showToast }) {
  const [selected, setSelected] = useState(messages[0]);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (!replyText.trim()) return;
    showToast('Message envoyé avec succès', 'success');
    setReplyText('');
  };

  return (
    <div className="page-enter">
      <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:20,minHeight:600}}>
        {/* List */}
        <div className="card" style={{marginBottom:0,padding:0,overflow:'hidden'}}>
          <div style={{padding:'16px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:16,fontWeight:700}}>Messagerie</h3>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Nouveau message','success')}>✉️ Nouveau</button>
          </div>
          <div style={{overflowY:'auto',maxHeight:540}}>
            {messages.map(m => (
              <div
                key={m.id}
                onClick={() => setSelected(m)}
                style={{padding:'14px 18px',borderBottom:'1px solid rgba(51,65,85,.4)',cursor:'pointer',background:selected?.id===m.id?'rgba(59,130,246,.1)':'transparent',borderLeft:`3px solid ${selected?.id===m.id?'var(--accent)':'transparent'}`,transition:'all .2s'}}
              >
                <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <div className="avatar" style={{background:m.color,flexShrink:0}}>{m.initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                      <span style={{fontWeight:m.unread?700:500,fontSize:13}}>{m.from}</span>
                      <span style={{fontSize:10,color:'var(--text-muted)'}}>{m.time}</span>
                    </div>
                    <div style={{fontSize:12,color:m.unread?'var(--text)':'var(--text-muted)',fontWeight:m.unread?600:400,marginBottom:2}}>{m.subject}</div>
                    <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.text}</div>
                  </div>
                  {m.unread && <div style={{width:8,height:8,borderRadius:'50%',background:'var(--accent)',flexShrink:0,marginTop:6}} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="card" style={{marginBottom:0}}>
          {selected ? (
            <>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20,paddingBottom:16,borderBottom:'1px solid var(--border)'}}>
                <div className="avatar" style={{background:selected.color,width:44,height:44,fontSize:14}}>{selected.initials}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>{selected.from}</div>
                  <div style={{fontSize:12,color:'var(--accent)'}}>{selected.role}</div>
                </div>
                <div style={{marginLeft:'auto',textAlign:'right'}}>
                  <div style={{fontSize:12,color:'var(--text-muted)'}}>{selected.date} · {selected.time}</div>
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:18,fontWeight:700,marginBottom:12}}>{selected.subject}</div>
                <div style={{fontSize:14,lineHeight:1.7,color:'var(--text-muted)'}}>{selected.text}</div>
              </div>
              <div style={{borderTop:'1px solid var(--border)',paddingTop:16,marginTop:'auto'}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Répondre</div>
                <textarea
                  className="form-textarea"
                  style={{width:'100%',marginBottom:10}}
                  placeholder="Votre réponse..."
                  value={replyText}
                  onChange={e=>setReplyText(e.target.value)}
                />
                <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                  <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Message archivé','success')}>📁 Archiver</button>
                  <button className="btn btn-primary" onClick={handleReply}>📤 Envoyer</button>
                </div>
              </div>
            </>
          ) : (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-muted)',fontSize:14}}>
              Sélectionnez un message pour le lire
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ REPORTS ══════════════ */
export function Reports({ showToast }) {
  const reports = [
    { icon: '📊', bg: 'rgba(59,130,246,.1)', title: 'Rapport de Performance Académique', desc: 'Moyennes, progression, comparatifs par classe — Fév 2026', badge: 'badge-info', badgeLabel: 'Nouveau' },
    { icon: '📅', bg: 'rgba(16,185,129,.1)', title: 'Rapport de Présence Mensuel', desc: 'Taux d\'assiduité, absences, retards — Fév 2026', badge: 'badge-success', badgeLabel: 'Disponible' },
    { icon: '💰', bg: 'rgba(245,158,11,.1)', title: 'Rapport Financier Trimestriel', desc: 'Revenus, dépenses, budget prévisionnel — T2 2025/26', badge: 'badge-success', badgeLabel: 'Disponible' },
    { icon: '👨‍🎓', bg: 'rgba(139,92,246,.1)', title: 'Rapport des Effectifs', desc: 'Inscriptions, mouvements, profil démographique', badge: 'badge-success', badgeLabel: 'Disponible' },
    { icon: '📝', bg: 'rgba(239,68,68,.1)', title: 'Rapport des Examens & Évaluations', desc: 'Résultats, statistiques, analyse par matière', badge: 'badge-warning', badgeLabel: 'En cours' },
    { icon: '👥', bg: 'rgba(20,184,166,.1)', title: 'Rapport RH & Personnel', desc: 'Effectifs, congés, évaluations, formations', badge: 'badge-success', badgeLabel: 'Disponible' },
    { icon: '📚', bg: 'rgba(99,102,241,.1)', title: 'Rapport Bibliothèque', desc: 'Emprunts, retards, titres populaires', badge: 'badge-success', badgeLabel: 'Disponible' },
    { icon: '🚌', bg: 'rgba(245,158,11,.1)', title: 'Rapport Transport Scolaire', desc: 'Utilisation lignes, incidents, coûts', badge: 'badge-warning', badgeLabel: 'En cours' },
  ];

  return (
    <div className="page-enter">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:18,marginBottom:24}}>
        {[{icon:'📊',label:'Rapports Générés',val:48},{icon:'📅',label:'Ce Mois',val:8},{icon:'🔔',label:'En Attente',val:3},{icon:'📤',label:'Partagés',val:12}].map((k,i)=>(
          <div key={i} className="stat-card"><div className="stat-header"><span className="stat-title">{k.label}</span><span className="stat-icon">{k.icon}</span></div><div className="stat-value">{k.val}</div></div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        {reports.map((r, i) => (
          <div key={i} className="report-card" onClick={()=>showToast(`Rapport "${r.title}" ouvert`,'success')}>
            <div className="report-icon" style={{background:r.bg}}>{r.icon}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                <h4 style={{fontSize:14,fontWeight:700}}>{r.title}</h4>
                <span className={`badge ${r.badge}`} style={{flexShrink:0,marginLeft:8}}>{r.badgeLabel}</span>
              </div>
              <p style={{fontSize:12,color:'var(--text-muted)'}}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:20}}>
        <div className="card-header">
          <h3 className="card-title">Générer un Rapport Personnalisé</h3>
        </div>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Type de rapport</label><select className="form-select"><option>Performance académique</option><option>Présence</option><option>Financier</option><option>RH</option></select></div>
          <div className="form-group"><label className="form-label">Période</label><select className="form-select"><option>Ce mois</option><option>Ce trimestre</option><option>Cette année</option><option>Personnalisée</option></select></div>
          <div className="form-group"><label className="form-label">Classe / Département</label><select className="form-select"><option>Toutes les classes</option><option>5A</option><option>6B</option><option>4C</option><option>3A</option></select></div>
          <div className="form-group"><label className="form-label">Format d'export</label><select className="form-select"><option>PDF</option><option>Excel</option><option>CSV</option></select></div>
        </div>
        <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
          <button className="btn btn-secondary" onClick={()=>showToast('Aperçu généré','success')}>👁️ Aperçu</button>
          <button className="btn btn-primary" onClick={()=>showToast('Rapport généré avec succès','success')}>📊 Générer Rapport</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ SETTINGS ══════════════ */
export function Settings({ showToast }) {
  const [settingsTab, setSettingsTab] = useState('general');

  return (
    <div className="page-enter">
      <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:20}}>
        {/* Settings Nav */}
        <div className="card" style={{marginBottom:0,padding:0}}>
          {[
            {id:'general',icon:'⚙️',label:'Général'},
            {id:'school',icon:'🏫',label:'École'},
            {id:'security',icon:'🔒',label:'Sécurité'},
            {id:'notifications',icon:'🔔',label:'Notifications'},
            {id:'integrations',icon:'🔗',label:'Intégrations'},
            {id:'backup',icon:'💾',label:'Sauvegarde'},
          ].map(s=>(
            <div
              key={s.id}
              className={`nav-item ${settingsTab===s.id?'active':''}`}
              onClick={()=>setSettingsTab(s.id)}
              style={{borderRadius:0}}
            >
              <span className="nav-icon">{s.icon}</span>{s.label}
            </div>
          ))}
        </div>

        {/* Settings Content */}
        <div>
          {settingsTab === 'general' && (
            <div className="card" style={{marginBottom:0}}>
              <div className="card-header"><h3 className="card-title">⚙️ Paramètres Généraux</h3></div>
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Langue de l'interface</label><select className="form-select"><option>Français</option><option>English</option><option>العربية</option></select></div>
                <div className="form-group"><label className="form-label">Fuseau horaire</label><select className="form-select"><option>Europe/Paris (UTC+1)</option><option>Africa/Bujumbura (UTC+2)</option></select></div>
                <div className="form-group"><label className="form-label">Format de date</label><select className="form-select"><option>JJ/MM/AAAA</option><option>MM/DD/YYYY</option><option>AAAA-MM-JJ</option></select></div>
                <div className="form-group"><label className="form-label">Devise</label><select className="form-select"><option>Euro (€)</option><option>Franc CFA (XAF)</option><option>Dollar ($)</option></select></div>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',marginTop:8}}>
                <button className="btn btn-primary" onClick={()=>showToast('Paramètres sauvegardés','success')}>💾 Sauvegarder</button>
              </div>
            </div>
          )}

          {settingsTab === 'school' && (
            <div className="card" style={{marginBottom:0}}>
              <div className="card-header"><h3 className="card-title">🏫 Informations de l'École</h3></div>
              <div className="form-grid">
                <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Nom de l'établissement</label><input className="form-input" defaultValue="Lycée Collège International EduManage Pro" /></div>
                <div className="form-group"><label className="form-label">Directeur</label><input className="form-input" defaultValue="M. Dupont" /></div>
                <div className="form-group"><label className="form-label">Email institutionnel</label><input className="form-input" type="email" defaultValue="contact@edumanage.edu.fr" /></div>
                <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" defaultValue="+33 1 23 45 67 89" /></div>
                <div className="form-group"><label className="form-label">Ville</label><input className="form-input" defaultValue="Paris" /></div>
                <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Adresse</label><input className="form-input" defaultValue="42 Avenue de l'Éducation, 75001 Paris" /></div>
                <div className="form-group"><label className="form-label">Année scolaire en cours</label><input className="form-input" defaultValue="2025/2026" /></div>
                <div className="form-group"><label className="form-label">Nombre max. élèves/classe</label><input className="form-input" type="number" defaultValue={35} /></div>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',marginTop:8}}>
                <button className="btn btn-primary" onClick={()=>showToast('Informations sauvegardées','success')}>💾 Sauvegarder</button>
              </div>
            </div>
          )}

          {settingsTab === 'security' && (
            <div className="card" style={{marginBottom:0}}>
              <div className="card-header"><h3 className="card-title">🔒 Sécurité & Accès</h3></div>
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Mot de passe actuel</label><input className="form-input" type="password" placeholder="••••••••" /></div>
                <div className="form-group"><label className="form-label">Nouveau mot de passe</label><input className="form-input" type="password" placeholder="••••••••" /></div>
                <div className="form-group"><label className="form-label">Confirmer le mot de passe</label><input className="form-input" type="password" placeholder="••••••••" /></div>
                <div className="form-group"><label className="form-label">Durée session (minutes)</label><input className="form-input" type="number" defaultValue={60} /></div>
              </div>
              <div style={{padding:'16px',background:'rgba(245,158,11,.1)',borderRadius:8,border:'1px solid rgba(245,158,11,.2)',marginTop:8,fontSize:13}}>
                ⚠️ La double authentification est recommandée pour les comptes administrateurs.
                <button className="btn btn-warning btn-sm" style={{marginLeft:12}} onClick={()=>showToast('2FA activé','success')}>Activer 2FA</button>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}>
                <button className="btn btn-primary" onClick={()=>showToast('Mot de passe mis à jour','success')}>🔒 Mettre à jour</button>
              </div>
            </div>
          )}

          {settingsTab === 'notifications' && (
            <div className="card" style={{marginBottom:0}}>
              <div className="card-header"><h3 className="card-title">🔔 Préférences de Notifications</h3></div>
              {[
                {label:'Nouvelles inscriptions',desc:'Notifier lors de l\'ajout d\'un élève'},
                {label:'Absences non justifiées',desc:'Alerte si absence > 2 jours'},
                {label:'Paiements en retard',desc:'Rappel frais de scolarité impayés'},
                {label:'Résultats d\'examens',desc:'Publication des notes'},
                {label:'Stock critique fournitures',desc:'Alerte niveau minimum atteint'},
                {label:'Rapports mensuels',desc:'Envoi automatique des rapports'},
              ].map((n, i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid rgba(51,65,85,.4)'}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:600}}>{n.label}</div>
                    <div style={{fontSize:12,color:'var(--text-muted)'}}>{n.desc}</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:44,height:24,cursor:'pointer'}}>
                    <input type="checkbox" defaultChecked={i < 4} style={{opacity:0,width:0,height:0}} onChange={()=>showToast('Préférence mise à jour','success')} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:i<4?'var(--accent)':'var(--border)',borderRadius:24,transition:'.3s'}}>
                      <span style={{position:'absolute',height:18,width:18,left:3,bottom:3,background:'white',borderRadius:'50%',transition:'.3s',transform:i<4?'translateX(20px)':'translateX(0)'}} />
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {(settingsTab === 'integrations' || settingsTab === 'backup') && (
            <div className="card" style={{marginBottom:0}}>
              <div className="card-header"><h3 className="card-title">{settingsTab==='integrations'?'🔗 Intégrations':'💾 Sauvegarde'}</h3></div>
              <div style={{textAlign:'center',padding:'40px 20px',color:'var(--text-muted)'}}>
                <div style={{fontSize:48,marginBottom:16}}>{settingsTab==='integrations'?'🔗':'💾'}</div>
                <div style={{fontSize:16,fontWeight:600,marginBottom:8}}>Section {settingsTab==='integrations'?'Intégrations':'Sauvegarde'}</div>
                <div style={{fontSize:13,marginBottom:20}}>Configurez vos {settingsTab==='integrations'?'intégrations API et services externes':'sauvegardes automatiques et restaurations'}</div>
                <button className="btn btn-primary" onClick={()=>showToast('Configuration ouverte','success')}>Configurer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
