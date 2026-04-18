import { useState } from 'react';
import { notifications } from '../../data/mockData';

export default function Header({ activePage, pageTitles, user, onLogout }) {
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;
  const title  = pageTitles?.[activePage] || activePage;

  // Initiales de l'utilisateur connecté
  const initials = user
    ? `${(user.firstName || user.first_name || 'A')[0]}${(user.lastName || user.last_name || 'D')[0]}`.toUpperCase()
    : 'AD';
  const fullName = user
    ? `${user.firstName || user.first_name || ''} ${user.lastName || user.last_name || ''}`.trim()
    : 'Administrateur';
  const roleName = user?.role?.label || user?.role?.name || 'Administrateur';

  return (
    <header className="header">
      <div className="header-left">
        <div>
          <div className="page-title">{title}</div>
          <div className="breadcrumb">
            <span>🏠</span><span>Accueil</span><span>›</span><span>{title}</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Rechercher élève, enseignant..." />
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <div className="icon-btn" onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}>
            🔔
            {unread > 0 && <span className="notification-badge">{unread}</span>}
          </div>
          {notifOpen && (
            <div className="notif-panel">
              <div className="notif-header">
                <h4>Notifications</h4>
                <span style={{ fontSize: 12, color: 'var(--accent)', cursor: 'pointer' }} onClick={() => setNotifOpen(false)}>Tout lire</span>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`} onClick={() => setNotifOpen(false)}>
                  <div className="notif-icon" style={{ background: n.bg }}>{n.icon}</div>
                  <div className="notif-text">
                    <strong>{n.title}</strong>
                    {n.text}
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="icon-btn">✉️<span className="notification-badge">12</span></div>

        {/* Profil + Logout */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-profile"
            style={{ cursor: 'pointer' }}
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
          >
            <div className="user-avatar">{initials}</div>
            <div>
              <div className="user-name">{fullName}</div>
              <div className="user-role">{roleName}</div>
            </div>
            <span style={{ marginLeft: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
              {profileOpen ? '▲' : '▼'}
            </span>
          </div>

          {profileOpen && (
            <div style={dropdownStyle}>
              <div style={dropdownHeader}>
                <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{fullName}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{roleName}</div>
              </div>
              <div style={dropdownDivider} />
              <button style={dropdownItem} onClick={() => setProfileOpen(false)}>
                👤 &nbsp; Mon profil
              </button>
              <button style={dropdownItem} onClick={() => setProfileOpen(false)}>
                ⚙️ &nbsp; Paramètres
              </button>
              <div style={dropdownDivider} />
              <button
                style={{ ...dropdownItem, color: '#f87171' }}
                onClick={() => { setProfileOpen(false); onLogout?.(); }}
              >
                🚪 &nbsp; Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const dropdownStyle = {
  position:     'absolute',
  right:        0,
  top:          'calc(100% + 10px)',
  background:   '#1e293b',
  border:       '1px solid #334155',
  borderRadius: '12px',
  minWidth:     '200px',
  boxShadow:    '0 10px 30px rgba(0,0,0,.4)',
  zIndex:       9999,
  overflow:     'hidden',
};
const dropdownHeader = {
  padding: '14px 16px',
};
const dropdownDivider = {
  height:     '1px',
  background: '#334155',
  margin:     '0',
};
const dropdownItem = {
  display:    'block',
  width:      '100%',
  padding:    '11px 16px',
  background: 'none',
  border:     'none',
  color:      '#cbd5e1',
  fontSize:   '14px',
  fontFamily: "'Outfit', sans-serif",
  textAlign:  'left',
  cursor:     'pointer',
};
