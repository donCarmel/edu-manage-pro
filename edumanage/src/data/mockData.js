export const students = [
  { id: 1, name: 'Alice Dubois', initials: 'AD', class: '5A', level: 'Cinquième', status: 'active', avg: 17.0, rank: '1er / 32', attendance: 100, phone: '06 12 34 56 78', email: 'alice.dubois@edu.fr', parent: 'Marie Dubois', color: 'linear-gradient(135deg,#3b82f6,#6366f1)' },
  { id: 2, name: 'Baptiste Martin', initials: 'BM', class: '6B', level: 'Sixième', status: 'active', avg: 14.2, rank: '8ème / 28', attendance: 80, phone: '06 23 45 67 89', email: 'baptiste.martin@edu.fr', parent: 'Jean Martin', color: 'linear-gradient(135deg,#10b981,#34d399)' },
  { id: 3, name: 'Camille Lefebvre', initials: 'CL', class: '4C', level: 'Quatrième', status: 'active', avg: 11.8, rank: '18ème / 35', attendance: 100, phone: '06 34 56 78 90', email: 'camille.lefebvre@edu.fr', parent: 'Paul Lefebvre', color: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
  { id: 4, name: 'David Rousseau', initials: 'DR', class: '3A', level: 'Troisième', status: 'warning', avg: 9.5, rank: '28ème / 30', attendance: 60, phone: '06 45 67 89 01', email: 'david.rousseau@edu.fr', parent: 'Lucie Rousseau', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { id: 5, name: 'Emma Bernard', initials: 'EB', class: '5B', level: 'Cinquième', status: 'active', avg: 13.4, rank: '12ème / 32', attendance: 80, phone: '06 56 78 90 12', email: 'emma.bernard@edu.fr', parent: 'Claude Bernard', color: 'linear-gradient(135deg,#ef4444,#f87171)' },
  { id: 6, name: 'François Petit', initials: 'FP', class: '6A', level: 'Sixième', status: 'active', avg: 15.6, rank: '3ème / 28', attendance: 96, phone: '06 67 89 01 23', email: 'francois.petit@edu.fr', parent: 'Hélène Petit', color: 'linear-gradient(135deg,#14b8a6,#2dd4bf)' },
  { id: 7, name: 'Géraldine Morel', initials: 'GM', class: '4B', level: 'Quatrième', status: 'active', avg: 16.2, rank: '2ème / 30', attendance: 98, phone: '06 78 90 12 34', email: 'geraldine.morel@edu.fr', parent: 'Serge Morel', color: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' },
];

export const teachers = [
  { id: 1, name: 'Pierre Martin', initials: 'PM', subject: 'Mathématiques', classes: ['5A','6B','4C','3A'], status: 'active', color: 'linear-gradient(135deg,#3b82f6,#6366f1)', email: 'p.martin@edu.fr', phone: '06 11 22 33 44' },
  { id: 2, name: 'Sophie Dubois', initials: 'SD', subject: 'Français', classes: ['4A','4B','5A'], status: 'active', color: 'linear-gradient(135deg,#10b981,#34d399)', email: 's.dubois@edu.fr', phone: '06 22 33 44 55' },
  { id: 3, name: 'Marc Bernard', initials: 'MB', subject: 'Sciences Physiques', classes: ['3A','3B','3C'], status: 'active', color: 'linear-gradient(135deg,#f59e0b,#fbbf24)', email: 'm.bernard@edu.fr', phone: '06 33 44 55 66' },
  { id: 4, name: 'Anne Laurent', initials: 'AL', subject: 'Histoire-Géographie', classes: ['6A','5A','4C'], status: 'active', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', email: 'a.laurent@edu.fr', phone: '06 44 55 66 77' },
  { id: 5, name: 'John Smith', initials: 'JS', subject: 'Anglais', classes: ['5A','6B','3A'], status: 'active', color: 'linear-gradient(135deg,#ef4444,#f87171)', email: 'j.smith@edu.fr', phone: '06 55 66 77 88' },
  { id: 6, name: 'Claire Morin', initials: 'CM', subject: 'Arts Plastiques', classes: ['5A','6B'], status: 'active', color: 'linear-gradient(135deg,#14b8a6,#2dd4bf)', email: 'c.morin@edu.fr', phone: '06 66 77 88 99' },
];

export const classes = [
  { id: 1, name: '5A', level: 'Cinquième', students: 32, capacity: 35, avg: 14.8, attendance: 96, teacher: 'Prof. Martin', teacherInitials: 'PM', teacherColor: 'linear-gradient(135deg,#3b82f6,#6366f1)', status: 'active' },
  { id: 2, name: '6B', level: 'Sixième', students: 28, capacity: 30, avg: 13.5, attendance: 94, teacher: 'Prof. Dubois', teacherInitials: 'SD', teacherColor: 'linear-gradient(135deg,#10b981,#34d399)', status: 'active' },
  { id: 3, name: '4C', level: 'Quatrième', students: 35, capacity: 36, avg: 12.9, attendance: 91, teacher: 'Prof. Bernard', teacherInitials: 'MB', teacherColor: 'linear-gradient(135deg,#f59e0b,#fbbf24)', status: 'active' },
  { id: 4, name: '3A', level: 'Troisième', students: 30, capacity: 35, avg: 15.2, attendance: 97, teacher: 'Prof. Renard', teacherInitials: 'CR', teacherColor: 'linear-gradient(135deg,#6366f1,#8b5cf6)', status: 'active' },
];

export const subjects = [
  { id: 1, icon: '➗', name: 'Mathématiques', category: 'Sciences exactes', teacher: 'Prof. Martin', classes: '5A, 6B, 4C, 3A', hours: 4, coeff: 4, status: 'active' },
  { id: 2, icon: '📖', name: 'Français', category: 'Lettres', teacher: 'Prof. Dubois', classes: '4A, 4B, 5A', hours: 4, coeff: 4, status: 'active' },
  { id: 3, icon: '🔬', name: 'Sciences Physiques', category: 'Sciences exactes', teacher: 'Prof. Bernard', classes: '3A, 3B, 3C', hours: 3, coeff: 3, status: 'active' },
  { id: 4, icon: '🌍', name: 'Histoire-Géographie', category: 'Sciences humaines', teacher: 'Prof. Laurent', classes: '6A, 5A, 4C', hours: 3, coeff: 3, status: 'active' },
  { id: 5, icon: '🇬🇧', name: 'Anglais', category: 'Lettres', teacher: 'Prof. Smith', classes: '5A, 6B, 3A', hours: 3, coeff: 3, status: 'active' },
  { id: 6, icon: '🧬', name: 'SVT', category: 'Sciences exactes', teacher: 'Prof. Morin', classes: '4C, 5A, 6A', hours: 2, coeff: 2, status: 'active' },
  { id: 7, icon: '🎨', name: 'Arts Plastiques', category: 'Arts', teacher: 'Prof. Claire', classes: '5A, 6B', hours: 2, coeff: 1, status: 'active' },
  { id: 8, icon: '🏃', name: 'Éducation Physique', category: 'Sport', teacher: 'Coach Pierre', classes: 'Toutes', hours: 2, coeff: 2, status: 'active' },
  { id: 9, icon: '🎵', name: 'Musique', category: 'Arts', teacher: 'Prof. Lefort', classes: '6B, 5A', hours: 1, coeff: 1, status: 'warning' },
];

export const exams = [
  { id: 1, subject: 'Mathématiques', class: '5A', type: 'Contrôle', date: '18 Fév 2026 — 09:00', duration: '2h', room: 'Salle 201', teacher: 'Prof. Martin', status: 'scheduled' },
  { id: 2, subject: 'Français', class: '4B', type: 'Examen Final', date: '19 Fév 2026 — 14:00', duration: '3h', room: 'Amphi A', teacher: 'Prof. Dubois', status: 'scheduled' },
  { id: 3, subject: 'Sciences Physiques', class: '3C', type: 'TP Évalué', date: '16 Fév 2026 — 10:00', duration: '1h30', room: 'Labo 1', teacher: 'Prof. Bernard', status: 'ongoing' },
  { id: 4, subject: 'Histoire-Géo', class: '6A', type: 'Contrôle', date: '15 Fév 2026 — 08:00', duration: '1h', room: 'Salle 305', teacher: 'Prof. Laurent', status: 'done' },
  { id: 5, subject: 'Anglais', class: '5B', type: 'Oral', date: '20 Fév 2026 — 13:00', duration: '20min/él.', room: 'Salle 110', teacher: 'Prof. Smith', status: 'scheduled' },
];

export const transactions = [
  { id: 1, date: '03 Mar 2026', desc: 'Frais de scolarité — Alice Dubois', category: 'Scolarité', type: 'income', amount: 1200, status: 'paid' },
  { id: 2, date: '03 Mar 2026', desc: 'Fournitures — Papeterie Dupont', category: 'Fournitures', type: 'expense', amount: 850, status: 'paid' },
  { id: 3, date: '28 Fév 2026', desc: 'Salaire — Pierre Martin', category: 'Salaires', type: 'expense', amount: 3500, status: 'paid' },
  { id: 4, date: '28 Fév 2026', desc: 'Cantine — Baptiste Martin (Fév)', category: 'Cantine', type: 'income', amount: 120, status: 'pending' },
  { id: 5, date: '27 Fév 2026', desc: 'Électricité & Eau — Fév 2026', category: 'Charges', type: 'expense', amount: 1250, status: 'paid' },
  { id: 6, date: '26 Fév 2026', desc: 'Subvention Ministère Éducation', category: 'Subventions', type: 'income', amount: 45000, status: 'received' },
  { id: 7, date: '25 Fév 2026', desc: 'Maintenance Informatique', category: 'Maintenance', type: 'expense', amount: 2100, status: 'paid' },
  { id: 8, date: '24 Fév 2026', desc: 'Transport scolaire — Fév 2026', category: 'Transport', type: 'expense', amount: 8500, status: 'paid' },
];

export const books = [
  { id: 1, icon: '📘', title: 'Algèbre Linéaire', author: 'Prof. Gauss', subject: 'Maths', available: 12, total: 15, color: 'rgba(59,130,246,0.15)' },
  { id: 2, icon: '📗', title: 'La Fontaine — Fables', author: 'Jean de La Fontaine', subject: 'Français', available: 8, total: 20, color: 'rgba(16,185,129,0.15)' },
  { id: 3, icon: '📙', title: 'Chimie Organique', author: 'Prof. Curie', subject: 'Sciences', available: 0, total: 10, color: 'rgba(245,158,11,0.15)' },
  { id: 4, icon: '📕', title: 'Histoire de France', author: 'Fernand Braudel', subject: 'Histoire', available: 5, total: 18, color: 'rgba(239,68,68,0.15)' },
  { id: 5, icon: '📓', title: 'English Grammar', author: 'Murphy', subject: 'Anglais', available: 14, total: 25, color: 'rgba(99,102,241,0.15)' },
  { id: 6, icon: '📒', title: 'Biologie Cellulaire', author: 'Prof. Morin', subject: 'SVT', available: 7, total: 12, color: 'rgba(20,184,166,0.15)' },
];

export const notifications = [
  { id: 1, icon: '👤', bg: 'rgba(59,130,246,0.15)', title: 'Nouvel élève inscrit', text: 'Thomas Leclerc rejoint la classe 6B', time: 'Il y a 5 min', unread: true },
  { id: 2, icon: '⚠️', bg: 'rgba(245,158,11,0.15)', title: 'Absence non justifiée', text: 'David Rousseau absent depuis 2 jours', time: 'Il y a 30 min', unread: true },
  { id: 3, icon: '💰', bg: 'rgba(16,185,129,0.15)', title: 'Paiement reçu', text: 'Frais scolarité — Famille Dubois', time: 'Il y a 1h', unread: true },
  { id: 4, icon: '📝', bg: 'rgba(139,92,246,0.15)', title: 'Examen programmé', text: 'Contrôle Maths 5A — 18 Fév 2026', time: 'Il y a 2h', unread: false },
];

export const timetableData = {
  '08h00–09h00': {
    lundi: { title: 'Mathématiques', info: 'Prof. Martin • 5A • Salle 201', color: '#3b82f6' },
    mardi: { title: 'Français', info: 'Prof. Dubois • 4B • Salle 102', color: '#10b981' },
    mercredi: null,
    jeudi: { title: 'Sciences', info: 'Prof. Bernard • 3C • Labo 1', color: '#f59e0b' },
    vendredi: { title: 'Histoire-Géo', info: 'Prof. Laurent • 6A • Salle 305', color: '#6366f1' },
  },
  '09h00–10h00': {
    lundi: { title: 'Anglais', info: 'Prof. Smith • 5A • Salle 115', color: '#10b981' },
    mardi: { title: 'Mathématiques', info: 'Prof. Martin • 6B • Salle 201', color: '#3b82f6' },
    mercredi: null,
    jeudi: { title: 'Français', info: 'Prof. Dubois • 5A • Salle 102', color: '#10b981' },
    vendredi: { title: 'Mathématiques', info: 'Prof. Martin • 4C • Salle 201', color: '#3b82f6' },
  },
  '10h15–11h15': {
    lundi: { title: 'Sciences', info: 'Prof. Bernard • 5A • Labo 2', color: '#f59e0b' },
    mardi: { title: 'EPS', info: 'Coach Pierre • Toutes • Gymnase', color: '#6366f1' },
    mercredi: null,
    jeudi: { title: 'Arts Plastiques', info: 'Prof. Claire • 5A • Salle Art', color: '#ef4444' },
    vendredi: { title: 'Anglais', info: 'Prof. Smith • 6B • Salle 115', color: '#10b981' },
  },
  '11h15–12h15': {
    lundi: { title: 'Histoire-Géo', info: 'Prof. Laurent • 3A • Salle 305', color: '#6366f1' },
    mardi: { title: 'SVT', info: 'Prof. Morin • 4C • Labo Bio', color: '#8b5cf6' },
    mercredi: null,
    jeudi: { title: 'Mathématiques', info: 'Prof. Martin • 3A • Salle 201', color: '#3b82f6' },
    vendredi: { title: 'Sciences', info: 'Prof. Bernard • 6B • Labo 1', color: '#f59e0b' },
  },
  '13h30–14h30': {
    lundi: { title: 'Français', info: 'Prof. Dubois • 6B • Salle 102', color: '#10b981' },
    mardi: { title: 'Mathématiques', info: 'Prof. Martin • 3A • Salle 201', color: '#3b82f6' },
    mercredi: null,
    jeudi: { title: 'SVT', info: 'Prof. Morin • 5A • Labo Bio', color: '#8b5cf6' },
    vendredi: { title: 'EPS', info: 'Coach Pierre • 6B • Gymnase', color: '#6366f1' },
  },
  '14h30–15h30': {
    lundi: { title: 'Musique', info: 'Prof. Lefort • 5A • Salle Musique', color: '#8b5cf6' },
    mardi: { title: 'Sciences', info: 'Prof. Bernard • 4C • Labo 2', color: '#f59e0b' },
    mercredi: null,
    jeudi: { title: 'Anglais', info: 'Prof. Smith • 3A • Salle 115', color: '#10b981' },
    vendredi: { title: 'Histoire-Géo', info: 'Prof. Laurent • 4C • Salle 305', color: '#6366f1' },
  },
};

export const attendanceData = [
  { id: 1, name: 'Alice Dubois', initials: 'AD', class: '5A', color: 'linear-gradient(135deg,#3b82f6,#6366f1)', days: ['present','present','present','present','present'], rate: 100 },
  { id: 2, name: 'Baptiste Martin', initials: 'BM', class: '6B', color: 'linear-gradient(135deg,#10b981,#34d399)', days: ['present','absent','present','present','late'], rate: 80 },
  { id: 3, name: 'Camille Lefebvre', initials: 'CL', class: '4C', color: 'linear-gradient(135deg,#f59e0b,#fbbf24)', days: ['present','present','present','present','present'], rate: 100 },
  { id: 4, name: 'David Rousseau', initials: 'DR', class: '3A', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', days: ['absent','absent','present','present','present'], rate: 60 },
  { id: 5, name: 'Emma Bernard', initials: 'EB', class: '5B', color: 'linear-gradient(135deg,#ef4444,#f87171)', days: ['present','present','absent','late','present'], rate: 80 },
];

export const gradesData = [
  { id: 1, name: 'Alice Dubois', initials: 'AD', class: '5A', color: 'linear-gradient(135deg,#3b82f6,#6366f1)', maths: 18.5, french: 17.2, science: 16.8, history: 15.5, english: 17.0, avg: 17.0, rank: '1er / 32' },
  { id: 2, name: 'Baptiste Martin', initials: 'BM', class: '6B', color: 'linear-gradient(135deg,#10b981,#34d399)', maths: 14.5, french: 13.8, science: 15.2, history: 14.0, english: 13.5, avg: 14.2, rank: '8ème / 28' },
  { id: 3, name: 'Camille Lefebvre', initials: 'CL', class: '4C', color: 'linear-gradient(135deg,#f59e0b,#fbbf24)', maths: 11.5, french: 13.2, science: 10.8, history: 12.5, english: 11.0, avg: 11.8, rank: '18ème / 35' },
  { id: 4, name: 'David Rousseau', initials: 'DR', class: '3A', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', maths: 8.5, french: 10.2, science: 9.0, history: 11.0, english: 8.8, avg: 9.5, rank: '28ème / 30' },
];

export const messages = [
  { id: 1, from: 'Marie Dubois', initials: 'MD', role: 'Parent', color: 'linear-gradient(135deg,#3b82f6,#6366f1)', subject: 'Absence justifiée', text: 'Bonjour, je vous informe qu\'Alice sera absente demain pour une consultation médicale.', time: '09:45', date: 'Aujourd\'hui', unread: true },
  { id: 2, from: 'Prof. Martin', initials: 'PM', role: 'Enseignant', color: 'linear-gradient(135deg,#10b981,#34d399)', subject: 'Résultats contrôle 5A', text: 'Les résultats du contrôle de mathématiques de la classe 5A sont disponibles dans le système.', time: '08:30', date: 'Aujourd\'hui', unread: true },
  { id: 3, from: 'Direction', initials: 'DIR', role: 'Administration', color: 'linear-gradient(135deg,#f59e0b,#fbbf24)', subject: 'Réunion pédagogique', text: 'Rappel : réunion pédagogique ce vendredi à 17h en salle de conférence.', time: 'Hier', date: 'Hier', unread: false },
  { id: 4, from: 'Jean Martin', initials: 'JM', role: 'Parent', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', subject: 'Demande rendez-vous', text: 'Je souhaiterais prendre rendez-vous avec le professeur principal de mon fils Baptiste.', time: 'Hier', date: 'Hier', unread: false },
];

export const supplies = [
  { id: 1, name: 'Ramettes papier A4 80g', category: 'Papeterie', current: 45, min: 50, max: 200, unit: 'Ramette', price: 4.20, status: 'low' },
  { id: 2, name: 'Stylos bille (lot 50)', category: 'Papeterie', current: 8, min: 20, max: 100, unit: 'Lot', price: 12.50, status: 'critical' },
  { id: 3, name: 'Cahiers grands carreaux', category: 'Papeterie', current: 120, min: 50, max: 300, unit: 'Pièce', price: 1.80, status: 'ok' },
  { id: 4, name: 'Produit nettoyant sol (5L)', category: 'Nettoyage', current: 12, min: 10, max: 50, unit: 'Bidon', price: 8.90, status: 'ok' },
  { id: 5, name: 'Cartouches imprimante HP', category: 'Bureautique', current: 6, min: 10, max: 40, unit: 'Pièce', price: 24.00, status: 'low' },
  { id: 6, name: 'Craies + feutres tableau', category: 'Pédagogique', current: 85, min: 30, max: 150, unit: 'Boîte', price: 3.50, status: 'ok' },
  { id: 7, name: 'Désinfectant mains (1L)', category: 'Nettoyage', current: 3, min: 15, max: 60, unit: 'Flacon', price: 5.20, status: 'critical' },
];
