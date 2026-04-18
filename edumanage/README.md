# EduManage Pro — Système de Gestion Scolaire

Application React complète de gestion scolaire, convertie depuis la maquette HTML originale.

---

## 🚀 Installation & Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Build de production
npm run build
```

---

## 📁 Structure du Projet

```
edumanage/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                          # Point d'entrée React
    ├── App.jsx                           # Composant principal + routage
    ├── styles/
    │   └── globals.css                   # Tous les styles (design dark)
    ├── data/
    │   └── mockData.js                   # Données mockées (élèves, profs, etc.)
    ├── hooks/
    │   └── useToast.js                   # Hook notifications toast
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx               # Navigation latérale
    │   │   └── Header.jsx                # En-tête + notifications + profil
    │   ├── ui/
    │   │   ├── Toast.jsx                 # Notifications toast
    │   │   ├── Modal.jsx                 # Fenêtre modale réutilisable
    │   │   └── ConfirmDialog.jsx         # Dialog de confirmation suppression
    │   └── pages/
    │       ├── Dashboard.jsx             # Tableau de bord + graphiques
    │       ├── Students.jsx              # Gestion des élèves
    │       ├── Teachers.jsx              # Gestion des enseignants
    │       ├── Classes.jsx               # Gestion des classes
    │       ├── AcademicPages.jsx         # Matières + Emploi du temps + Examens
    │       ├── AttendanceGrades.jsx      # Présences + Notes
    │       ├── Finance.jsx               # Finance (4 onglets)
    │       ├── HR.jsx                    # RH & Personnel (5 onglets)
    │       ├── OtherPages.jsx            # Bibliothèque + Transport + Cantine + Fournitures
    │       └── CommPages.jsx             # Messages + Rapports + Paramètres
```

---

## 📑 Pages Disponibles (18 pages)

| Page | Composant | Description |
|------|-----------|-------------|
| Tableau de Bord | `Dashboard` | Stats, graphiques canvas, programme du jour |
| Élèves | `Students` | CRUD élèves, recherche, filtres |
| Enseignants | `Teachers` | CRUD enseignants |
| Classes | `Classes` | Fiches classes avec taux remplissage |
| Matières | `Subjects` | Catalogue avec coefficients |
| Emploi du Temps | `Schedule` | Grille horaire interactive |
| Présences | `Attendance` | Feuille cliquable ✓/✗/⚠ |
| Notes | `Grades` | Bulletins avec KPIs |
| Examens | `Exams` | Calendrier des évaluations |
| Finance | `Finance` | Transactions, salaires, budget, frais |
| RH | `HR` | Personnel, recrutement, congés, formations, évaluations |
| Bibliothèque | `Library` | Catalogue, emprunts, retards |
| Transport | `Transport` | Lignes de bus, arrêts |
| Cantine | `Canteen` | Menus semaine, inscrits, stats |
| Fournitures | `Supplies` | Stocks, alertes, commandes |
| Messages | `Messages` | Interface mail avec réponse |
| Rapports | `Reports` | Générateur de rapports |
| Paramètres | `Settings` | Config générale, école, sécurité, notifs |

---

## 🎨 Design System

- **Thème** : Dark (fond `#0f172a`)
- **Police** : Outfit + Space Mono
- **Couleurs** : Accent bleu `#3b82f6`, success vert, warning orange, danger rouge
- **Composants** : Cards, Tables, Modals, Badges, Buttons, Progress bars, Tabs, KPIs

---

## 🔧 Technologies

- **React 18** avec hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- **Vite** comme bundler
- **CSS pur** (pas de Tailwind, pas de lib UI externe)
- **Canvas API** pour les graphiques du dashboard

---

## ✅ Fonctionnalités Interactives

- ✅ Navigation entre 18 pages
- ✅ Notifications toast (succès / erreur / alerte)
- ✅ Modals d'ajout (formulaires)
- ✅ Dialog de confirmation suppression
- ✅ Présences cliquables (toggle ✓/✗/⚠)
- ✅ Graphiques canvas (line chart, pie chart)
- ✅ Filtres et recherche
- ✅ Tabs (Finance, HR, Bibliothèque, Cantine, Paramètres)
- ✅ Panel notifications dans le header
- ✅ Messagerie avec réponse
