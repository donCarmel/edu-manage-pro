import { useState, useEffect } from 'react';
import './styles/globals.css';

import Login    from './components/pages/Login';
import Sidebar  from './components/layout/Sidebar';
import Header   from './components/layout/Header';
import Toast    from './components/ui/Toast';
import { useToast } from './hooks/useToast';

import Dashboard       from './components/pages/Dashboard';
import Students        from './components/pages/Students';
import Teachers        from './components/pages/Teachers';
import Classes         from './components/pages/Classes';
import Niveaux         from './components/pages/Niveaux';
import { Subjects, Schedule, Exams }                    from './components/pages/AcademicPages';
import { Attendance, Grades }                           from './components/pages/AttendanceGrades';
import Finance         from './components/pages/Finance';
import HR              from './components/pages/HR';
import { Library, Transport, Canteen, Supplies }        from './components/pages/OtherPages';
import { Messages, Reports, Settings }                  from './components/pages/CommPages';
import { AcademicYears, Enrollment, Council, Rooms }    from './components/pages/NewPages1';
import { Messaging, Leaves, Parents, Infirmerie, Activities, Users } from './components/pages/NewPages2';
import { subjects } from './data/mockData';

const pageTitles = {
  dashboard: 'Tableau de Bord', students: 'Gestion des Élèves', teachers: 'Gestion des Enseignants',
  classes: 'Gestion des Classes', subjects: 'Matières', schedule: 'Emploi du Temps',
  niveaux: 'Niveaux Scolaires', subjects: 'Niveau', schedule: 'Niveau des classes',
  attendance: 'Présences', grades: 'Notes & Bulletins', exams: 'Examens',
  finance: 'Finances', hr: 'Ressources Humaines', library: 'Bibliothèque',
  transport: 'Transport', canteen: 'Cantine', supplies: 'Fournitures',
  messages: 'Messages', reports: 'Rapports & Analyses', settings: 'Paramètres',
  'academic-years': 'Années Académiques', enrollment: 'Inscriptions',
  council: 'Conseil de Classe', messaging: 'Messagerie Interne',
  leaves: 'Congés & Absences RH', rooms: 'Salles & Ressources',
  parents: 'Portail Parents', infirmerie: 'Infirmerie & Santé',
  activities: 'Activités Parascolaires', users: 'Utilisateurs & Rôles',
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser]             = useState(null);
  const { toast, showToast }        = useToast();

  // Vérifier si déjà connecté (token en localStorage)
  useEffect(() => {
    const token     = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch { logout(); }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    showToast(`Bienvenue, ${userData?.firstName || 'Administrateur'} ! 👋`, 'success');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setActivePage('dashboard');
  };

  // ── Page de login ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toast toast={toast} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </>
    );
  }

  // ── Application principale ─────────────────────────────────────────────────
  const props = { showToast };
  const pages = {
    dashboard:        <Dashboard {...props} />,
    students:         <Students {...props} />,
    teachers:         <Teachers {...props} />,
    classes:          <Classes {...props} />,
    niveaux:          <Niveaux {...props} />,
    subjects:         <Subjects {...props} />,
    schedule:         <Schedule {...props} />,
    attendance:       <Attendance {...props} />,
    grades:           <Grades {...props} />,
    exams:            <Exams {...props} />,
    finance:          <Finance {...props} />,
    hr:               <HR {...props} />,
    library:          <Library {...props} />,
    transport:        <Transport {...props} />,
    canteen:          <Canteen {...props} />,
    supplies:         <Supplies {...props} />,
    messages:         <Messages {...props} />,
    reports:          <Reports {...props} />,
    settings:         <Settings {...props} />,
    'academic-years': <AcademicYears {...props} />,
    enrollment:       <Enrollment {...props} />,
    council:          <Council {...props} />,
    messaging:        <Messaging {...props} />,
    leaves:           <Leaves {...props} />,
    rooms:            <Rooms {...props} />,
    parents:          <Parents {...props} />,
    infirmerie:       <Infirmerie {...props} />,
    activities:       <Activities {...props} />,
    users:            <Users {...props} />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-content">
        <Header
          activePage={activePage}
          pageTitles={pageTitles}
          user={user}
          onLogout={logout}
        />
        <div className="content">
          {pages[activePage] || pages.dashboard}
        </div>
      </div>
      <Toast toast={toast} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
