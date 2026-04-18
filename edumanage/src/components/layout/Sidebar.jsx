const navSections = [
  { title: 'Principal', items: [{ id: 'dashboard', icon: '📊', label: 'Tableau de Bord' }] },
  { title: 'Gestion', items: [
    { id: 'students', icon: '👨‍🎓', label: 'Élèves' },
    { id: 'teachers', icon: '👨‍🏫', label: 'Enseignants' },
    { id: 'classes', icon: '🏫', label: 'Classes' },
    { id: 'subjects', icon: '📚', label: 'Matières' },
  ]},
  { title: 'Académique', items: [
    { id: 'exams', icon: '📝', label: 'Examens', badge: 3 },
    { id: 'schedule', icon: '📅', label: 'Emploi du Temps' },
    { id: 'attendance', icon: '✅', label: 'Présence' },
    { id: 'grades', icon: '🎯', label: 'Notes & Bulletins' },
  ]},
  { title: 'Administration', items: [
    { id: 'finance', icon: '💰', label: 'Finances' },
    { id: 'hr', icon: '👥', label: 'Ressources Humaines' },
    { id: 'library', icon: '📖', label: 'Bibliothèque' },
    { id: 'transport', icon: '🚌', label: 'Transport' },
  ]},
  { title: 'Système', items: [
    { id: 'reports', icon: '📈', label: 'Rapports' },
    { id: 'settings', icon: '⚙️', label: 'Paramètres' },
  ]},
  { title: 'Nouveau', items: [
    { id: 'academic-years', icon: '📆', label: 'Années Académiques' },
    { id: 'enrollment', icon: '📋', label: 'Inscriptions', badge: 12 },
    { id: 'canteen', icon: '🍽️', label: 'Cantine' },
    { id: 'council', icon: '🏆', label: 'Conseil de Classe' },
    { id: 'messaging', icon: '💬', label: 'Messagerie', badge: 7 },
    { id: 'leaves', icon: '🏖️', label: 'Congés & Absences RH' },
    { id: 'rooms', icon: '🚪', label: 'Salles & Ressources' },
  ]},
  { title: 'Compléments', items: [
    { id: 'parents', icon: '📱', label: 'Portail Parents', badge: 4 },
    { id: 'infirmerie', icon: '🏥', label: 'Infirmerie & Santé' },
    { id: 'activities', icon: '🎭', label: 'Activités Parascolaires' },
    { id: 'users', icon: '🔐', label: 'Utilisateurs & Rôles' },
  ]},
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">🎓</div>
          <div>EduManage<span className="logo-sub">PRO v2.0</span></div>
        </div>
      </div>
      <nav className="nav-menu">
        {navSections.map((section) => (
          <div className="nav-section" key={section.title}>
            <div className="nav-section-title">{section.title}</div>
            {section.items.map((item) => (
              <div key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}
