import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const COLORS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#34d399)",
  "linear-gradient(135deg,#f59e0b,#fbbf24)",
  "linear-gradient(135deg,#ef4444,#f87171)",
  "linear-gradient(135deg,#3b82f6,#60a5fa)",
  "linear-gradient(135deg,#ec4899,#f472b6)",
];
const getColor = (id) => COLORS[Number(id) % COLORS.length];
const getInitials = (t) => {
  const fn = t.user?.firstName || t.firstName || "";
  const ln = t.user?.lastName || t.lastName || "";
  return (fn[0] || "") + (ln[0] || "");
};
const getFullName = (t) =>
  `${t.user?.firstName || t.firstName || ""} ${t.user?.lastName || t.lastName || ""}`.trim();

const cycleBadge = (cycle) =>
  ({
    PRIMAIRE: { label: "Primaire", color: "#3b82f6" },
    SECONDAIRE: { label: "Secondaire", color: "#10b981" },
    HUMANITES: { label: "Humanités", color: "#8b5cf6" },
  })[cycle] || { label: cycle || "—", color: "#64748b" };

const CYCLES = ["PRIMAIRE", "SECONDAIRE", "HUMANITES"];
const EXPERTISE_LABELS = {
  debutant: "Débutant",
  confirme: "Confirmé",
  expert: "Expert",
};

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "password123",
  roleId: 3,
  status: "active",
};
const EMPTY_EMP = {
  employeeCode: "",
  department: "Académique",
  position: "Enseignant",
  hireDate: "",
  grossSalary: 0,
  contractType: "CDI",
  status: "active",
  employeeId: null, // rempli après création
};
const EMPTY_QUAL = {
  subjectId: "",
  cycles: [],
  maxHoursWeek: 18,
  expertiseLevel: "confirme",
};

export default function Teachers({ showToast }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selected, setSelected] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [empForm, setEmpForm] = useState(EMPTY_EMP);
  const [qualifications, setQualifications] = useState([]); // liste des quals ajoutées
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");

  // ── Fetch teachers ────────────────────────────────────────────────────
  const fetchTeachers = () => {
    setLoading(true);
    fetch(`${API}/teachers?limit=200`, { headers: authHeader() })
      .then((r) => r.json())
      .then((res) =>
        setTeachers(res.data?.rows || res.data?.teachers || res.data || []),
      )
      .catch(() => showToast("Erreur chargement enseignants", "error"))
      .finally(() => setLoading(false));
  };

  // ── Fetch subjects (pour l'étape 3) ──────────────────────────────────
  const fetchSubjects = () => {
    fetch(`${API}/subjects?limit=200`, { headers: authHeader() })
      .then((r) => r.json())
      .then((res) => setSubjects(res.data?.rows || res.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  // ── Ouvrir détail ─────────────────────────────────────────────────────
  const openDetail = async (t) => {
    setSelected(t);
    setClasses([]);
    setDetailOpen(true);
    setLoadingClasses(true);
    try {
      const res = await fetch(`${API}/teachers/${t.id}/classes`, {
        headers: authHeader(),
      });
      const data = await res.json();
      setClasses(data.data?.classes || []);
    } catch {
      showToast("Impossible de charger les classes", "error");
    } finally {
      setLoadingClasses(false);
    }
  };

  // ── Helpers qualifications ────────────────────────────────────────────
  const addQual = () => setQualifications((q) => [...q, { ...EMPTY_QUAL }]);

  const removeQual = (i) =>
    setQualifications((q) => q.filter((_, idx) => idx !== i));

  const updateQual = (i, field, value) =>
    setQualifications((q) =>
      q.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)),
    );

  const toggleCycle = (qualIdx, cycle) =>
    setQualifications((q) =>
      q.map((item, idx) => {
        if (idx !== qualIdx) return item;
        const cycles = item.cycles.includes(cycle)
          ? item.cycles.filter((c) => c !== cycle)
          : [...item.cycles, cycle];
        return { ...item, cycles };
      }),
    );

  // ── ÉTAPE 1 : Créer le compte utilisateur ────────────────────────────
  const handleCreateUser = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      showToast(
        "Prénom, nom, email et mot de passe sont obligatoires",
        "error",
      );
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ ...form, roleId: 3 }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur création compte", "error");
        return;
      }
      setEmpForm((f) => ({ ...f, userId: data.data?.id }));
      setStep(2);
      showToast("Compte créé ✅ — Compléter la fiche RH", "success");
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── ÉTAPE 2 : Créer la fiche employé ─────────────────────────────────
  const handleCreateEmployee = async () => {
    if (!empForm.employeeCode || !empForm.hireDate) {
      showToast("Code employé et date d'embauche sont obligatoires", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/employees`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(empForm),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur fiche RH", "error");
        return;
      }

      // Stocker l'employeeId pour l'étape 3
      const newEmployeeId = data.data?.id;
      setEmpForm((f) => ({ ...f, employeeId: newEmployeeId }));

      showToast("Fiche RH créée ✅ — Ajouter les qualifications", "success");
      setQualifications([{ ...EMPTY_QUAL }]); // pré-ajouter une ligne vide
      setStep(3);
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── ÉTAPE 3 : Enregistrer les qualifications ──────────────────────────
  const handleSaveQualifications = async () => {
    const validQuals = qualifications.filter(
      (q) => q.subjectId && q.cycles.length > 0,
    );

    if (validQuals.length === 0) {
      // Pas de qualifications → terminer quand même
      finishAndClose();
      return;
    }

    setSaving(true);
    let saved = 0;
    let errors = 0;

    for (const q of validQuals) {
      try {
        const res = await fetch(`${API}/teacher-qualifications`, {
          method: "POST",
          headers: authHeader(),
          body: JSON.stringify({
            employeeId: empForm.employeeId,
            subjectId: parseInt(q.subjectId),
            cycles: q.cycles,
            maxHoursWeek: parseInt(q.maxHoursWeek) || 18,
            expertiseLevel: q.expertiseLevel,
          }),
        });
        if (res.ok) saved++;
        else errors++;
      } catch {
        errors++;
      }
    }

    if (errors > 0)
      showToast(
        `⚠️ ${saved} qualification(s) enregistrée(s), ${errors} erreur(s)`,
        "warning",
      );
    else showToast(`${saved} qualification(s) enregistrée(s) ✅`, "success");

    finishAndClose();
    setSaving(false);
  };

  const finishAndClose = () => {
    showToast(
      `Enseignant ${form.firstName} ${form.lastName} enregistré ✅`,
      "success",
    );
    setAddOpen(false);
    setForm(EMPTY_FORM);
    setEmpForm(EMPTY_EMP);
    setQualifications([]);
    setStep(1);
    fetchTeachers();
  };

  // ── Supprimer enseignant ──────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      await fetch(`${API}/employees/${deleteTarget.id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      showToast(`${getFullName(deleteTarget)} supprimé`, "success");
      setDeleteTarget(null);
      fetchTeachers();
    } catch {
      showToast("Erreur suppression", "error");
    }
  };

  // ── Filtres ───────────────────────────────────────────────────────────
  const filtered = teachers.filter((t) => {
    const s = search.toLowerCase();
    return (
      getFullName(t).toLowerCase().includes(s) ||
      (t.user?.email || "").toLowerCase().includes(s) ||
      (t.employeeCode || "").toLowerCase().includes(s)
    );
  });

  const activeCount = teachers.filter(
    (t) => (t.user?.status || t.status) === "active",
  ).length;
  const onLeaveCount = teachers.filter((t) => t.status === "on_leave").length;
  const deptCount = new Set(teachers.map((t) => t.department).filter(Boolean))
    .size;

  // ── Titre de l'étape ──────────────────────────────────────────────────
  const stepTitle =
    step === 1
      ? "➕ Enseignant — Étape 1/3 : Compte"
      : step === 2
        ? "➕ Enseignant — Étape 2/3 : Fiche RH"
        : "➕ Enseignant — Étape 3/3 : Qualifications";

  // ═════════════════════════════════════════════════════════════════════
  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid">
        {[
          {
            title: "Total Enseignants",
            value: loading ? "…" : teachers.length,
            icon: "👨‍🏫",
            cls: "",
          },
          {
            title: "En Activité",
            value: loading ? "…" : activeCount,
            icon: "✓",
            cls: " success",
          },
          {
            title: "En Congé",
            value: loading ? "…" : onLeaveCount,
            icon: "🏖️",
            cls: " warning",
          },
          {
            title: "Départements",
            value: loading ? "…" : deptCount,
            icon: "🏢",
            cls: " purple",
          },
        ].map(({ title, value, icon, cls }) => (
          <div key={title} className={`stat-card${cls}`}>
            <div className="stat-header">
              <span className="stat-title">{title}</span>
              <span className="stat-icon">{icon}</span>
            </div>
            <div className="stat-value">{value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Liste des Enseignants</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div className="search-bar" style={{ width: 220 }}>
              <span className="search-icon">🔍</span>
              <input
                placeholder="Nom, email, code…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={fetchTeachers}
            >
              🔄
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setAddOpen(true);
                setStep(1);
              }}
            >
              ➕ Nouvel Enseignant
            </button>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: "var(--text-muted)",
              }}
            >
              Chargement…
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>👨‍🏫</div>
              <p>
                {teachers.length === 0
                  ? "Aucun enseignant enregistré."
                  : "Aucun résultat."}
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Enseignant</th>
                  <th>Code</th>
                  <th>Poste</th>
                  <th>Département</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Contrat</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const status = t.user?.status || t.status || "active";
                  return (
                    <tr key={t.id}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            className="avatar"
                            style={{
                              background: getColor(t.id),
                              color: "white",
                              fontWeight: 700,
                            }}
                          >
                            {getInitials(t)}
                          </div>
                          <strong>{getFullName(t)}</strong>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "monospace",
                            background: "var(--primary)",
                            padding: "3px 8px",
                            borderRadius: 6,
                            fontSize: 12,
                            border: "1px solid var(--border)",
                          }}
                        >
                          {t.employeeCode}
                        </span>
                      </td>
                      <td style={{ fontSize: 13 }}>{t.position || "—"}</td>
                      <td style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        {t.department || "—"}
                      </td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {t.user?.email || "—"}
                      </td>
                      <td style={{ fontSize: 12 }}>{t.user?.phone || "—"}</td>
                      <td>
                        <span
                          style={{
                            fontSize: 11,
                            padding: "3px 8px",
                            borderRadius: 10,
                            background: "rgba(59,130,246,.1)",
                            color: "#60a5fa",
                            border: "1px solid rgba(59,130,246,.2)",
                          }}
                        >
                          {t.contractType || "—"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${status === "active" ? "badge-success" : status === "on_leave" ? "badge-warning" : "badge-danger"}`}
                        >
                          {status === "active"
                            ? "Actif"
                            : status === "on_leave"
                              ? "Congé"
                              : "Inactif"}
                        </span>
                      </td>
                      <td>
                        <div className="action-menu">
                          <div
                            className="action-btn"
                            title="Voir classes"
                            onClick={() => openDetail(t)}
                          >
                            👁️
                          </div>
                          <div
                            className="action-btn"
                            title="Modifier"
                            onClick={() =>
                              showToast("Bientôt disponible", "success")
                            }
                          >
                            ✏️
                          </div>
                          <div
                            className="action-btn"
                            title="Supprimer"
                            onClick={() => setDeleteTarget(t)}
                          >
                            🗑️
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Modal DÉTAIL + CLASSES ────────────────────────────────────── */}
      {selected && (
        <Modal
          isOpen={detailOpen}
          onClose={() => {
            setDetailOpen(false);
            setSelected(null);
            setClasses([]);
          }}
          title={`👨‍🏫 ${getFullName(selected)}`}
          footer={
            <button
              className="btn btn-secondary"
              onClick={() => {
                setDetailOpen(false);
                setSelected(null);
                setClasses([]);
              }}
            >
              Fermer
            </button>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: 16,
                background: "var(--primary)",
                borderRadius: 12,
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 14,
                  background: getColor(selected.id),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {getInitials(selected)}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  {getFullName(selected)}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  {selected.position} • {selected.department}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {selected.user?.email || "—"}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 10,
              }}
            >
              {[
                ["🪪 Code employé", selected.employeeCode],
                ["📋 Contrat", selected.contractType],
                [
                  "⏰ Temps travail",
                  selected.workType === "temps_plein"
                    ? "Temps plein"
                    : "Temps partiel",
                ],
                ["📅 Date embauche", selected.hireDate || "—"],
                ["📞 Téléphone", selected.user?.phone || "—"],
                ["🔖 Statut RH", selected.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "var(--primary)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {value || "—"}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: "var(--text-muted)",
                }}
              >
                🏫 CLASSES ASSIGNÉES{" "}
                {classes.length > 0 && `(${classes.length})`}
              </div>
              {loadingClasses ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: 20,
                    color: "var(--text-muted)",
                  }}
                >
                  Chargement…
                </div>
              ) : classes.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: 20,
                    color: "var(--text-muted)",
                    background: "var(--primary)",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                  }}
                >
                  Aucune classe assignée
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
                    gap: 8,
                  }}
                >
                  {classes.map((cls) => {
                    const b = cycleBadge(cls.cycle);
                    const isPrimary =
                      cls.TeacherClass?.isPrimary ||
                      cls.teacherClass?.isPrimary;
                    return (
                      <div
                        key={cls.id}
                        style={{
                          background: "var(--primary)",
                          borderRadius: 10,
                          padding: "10px 12px",
                          border: `1px solid ${b.color}33`,
                          position: "relative",
                        }}
                      >
                        {isPrimary && (
                          <span
                            style={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              fontSize: 9,
                              background: "#f59e0b22",
                              color: "#f59e0b",
                              padding: "1px 5px",
                              borderRadius: 8,
                              border: "1px solid #f59e0b44",
                            }}
                          >
                            Principal
                          </span>
                        )}
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 800,
                            letterSpacing: 1,
                            color: b.color,
                          }}
                        >
                          {cls.name}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            marginTop: 2,
                          }}
                        >
                          {b.label} • Niv.{cls.gradeNumber}
                        </div>
                        <div
                          style={{ fontSize: 10, color: "var(--text-muted)" }}
                        >
                          {cls.academicYear?.label || "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* ── Modal CRÉER 3 étapes ──────────────────────────────────────── */}
      <Modal
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          setStep(1);
          setForm(EMPTY_FORM);
          setEmpForm(EMPTY_EMP);
          setQualifications([]);
        }}
        title={stepTitle}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (step > 1) setStep((s) => s - 1);
                else {
                  setAddOpen(false);
                  setForm(EMPTY_FORM);
                  setEmpForm(EMPTY_EMP);
                  setQualifications([]);
                }
              }}
            >
              {step > 1 ? "← Retour" : "Annuler"}
            </button>

            {/* Étape 3 → bouton Terminer sans qualifs */}
            {step === 3 && (
              <button
                className="btn btn-secondary"
                onClick={finishAndClose}
                disabled={saving}
              >
                Terminer sans qualifications
              </button>
            )}

            <button
              className="btn btn-primary"
              onClick={
                step === 1
                  ? handleCreateUser
                  : step === 2
                    ? handleCreateEmployee
                    : handleSaveQualifications
              }
              disabled={saving}
            >
              {saving
                ? "Enregistrement…"
                : step === 1
                  ? "Suivant →"
                  : step === 2
                    ? "Suivant →"
                    : `Enregistrer${qualifications.filter((q) => q.subjectId && q.cycles.length).length > 0 ? ` (${qualifications.filter((q) => q.subjectId && q.cycles.length).length} qual.)` : ""}`}
            </button>
          </>
        }
      >
        {/* ─── ÉTAPE 1 : Compte ─── */}
        {step === 1 && (
          <div className="form-grid">
            <div
              style={{
                gridColumn: "1/-1",
                background: "rgba(59,130,246,.08)",
                border: "1px solid rgba(59,130,246,.2)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#93c5fd",
              }}
            >
              ℹ️ Ces informations créeront le compte de connexion de
              l'enseignant.
            </div>
            <div className="form-group">
              <label className="form-label">Prénom *</label>
              <input
                className="form-input"
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, firstName: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nom *</label>
              <input
                className="form-input"
                placeholder="Nom"
                value={form.lastName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lastName: e.target.value }))
                }
              />
            </div>
            <div className="form-group" style={{ gridColumn: "1/-1" }}>
              <label className="form-label">Email *</label>
              <input
                className="form-input"
                type="email"
                placeholder="prenom.nom@edu.local"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input
                className="form-input"
                placeholder="+257 XX XX XX XX"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe *</label>
              <input
                className="form-input"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        {/* ─── ÉTAPE 2 : Fiche RH ─── */}
        {step === 2 && (
          <div className="form-grid">
            <div
              style={{
                gridColumn: "1/-1",
                background: "rgba(16,185,129,.08)",
                border: "1px solid rgba(16,185,129,.2)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#6ee7b7",
              }}
            >
              ✅ Compte créé pour{" "}
              <strong>
                {form.firstName} {form.lastName}
              </strong>
              . Complétez la fiche RH.
            </div>
            <div className="form-group">
              <label className="form-label">Code Employé *</label>
              <input
                className="form-input"
                placeholder="EMP-001"
                value={empForm.employeeCode}
                onChange={(e) =>
                  setEmpForm((f) => ({ ...f, employeeCode: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date d'embauche *</label>
              <input
                className="form-input"
                type="date"
                value={empForm.hireDate}
                onChange={(e) =>
                  setEmpForm((f) => ({ ...f, hireDate: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Département</label>
              <input
                className="form-input"
                value={empForm.department}
                onChange={(e) =>
                  setEmpForm((f) => ({ ...f, department: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Poste</label>
              <input
                className="form-input"
                value={empForm.position}
                onChange={(e) =>
                  setEmpForm((f) => ({ ...f, position: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Type de contrat</label>
              <select
                className="form-select"
                value={empForm.contractType}
                onChange={(e) =>
                  setEmpForm((f) => ({ ...f, contractType: e.target.value }))
                }
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="vacataire">Vacataire</option>
                <option value="stage">Stage</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Salaire brut</label>
              <input
                className="form-input"
                type="number"
                value={empForm.grossSalary}
                onChange={(e) =>
                  setEmpForm((f) => ({ ...f, grossSalary: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        {/* ─── ÉTAPE 3 : Qualifications ─── */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "rgba(139,92,246,.08)",
                border: "1px solid rgba(139,92,246,.2)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#c4b5fd",
              }}
            >
              🎓 Définissez les matières que{" "}
              <strong>
                {form.firstName} {form.lastName}
              </strong>{" "}
              peut enseigner, les cycles concernés et son quota d'heures.
            </div>

            {/* Liste des qualifications */}
            {qualifications.map((q, i) => (
              <div
                key={i}
                style={{
                  background: "var(--primary)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 16,
                  position: "relative",
                }}
              >
                {/* Supprimer ligne */}
                {qualifications.length > 1 && (
                  <button
                    onClick={() => removeQual(i)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "rgba(239,68,68,.1)",
                      border: "1px solid rgba(239,68,68,.3)",
                      borderRadius: 6,
                      color: "#f87171",
                      cursor: "pointer",
                      fontSize: 12,
                      padding: "2px 8px",
                    }}
                  >
                    ✕
                  </button>
                )}

                {/* Matière */}
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="form-label">Matière *</label>
                  <select
                    className="form-select"
                    value={q.subjectId}
                    onChange={(e) => updateQual(i, "subjectId", e.target.value)}
                  >
                    <option value="">— Sélectionner une matière —</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                        {s.shortCode ? ` (${s.shortCode})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cycles (multi-select checkboxes) */}
                <div style={{ marginBottom: 12 }}>
                  <label className="form-label">Cycles autorisés *</label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginTop: 6,
                    }}
                  >
                    {CYCLES.map((cycle) => {
                      const b = cycleBadge(cycle);
                      const checked = q.cycles.includes(cycle);
                      return (
                        <div
                          key={cycle}
                          onClick={() => toggleCycle(i, cycle)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 12px",
                            borderRadius: 8,
                            cursor: "pointer",
                            border: `1px solid ${checked ? b.color : "var(--border)"}`,
                            background: checked
                              ? b.color + "22"
                              : "var(--secondary)",
                            color: checked ? b.color : "var(--text-muted)",
                            fontSize: 13,
                            fontWeight: checked ? 700 : 400,
                            userSelect: "none",
                          }}
                        >
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: 4,
                              border: `2px solid ${checked ? b.color : "var(--border)"}`,
                              background: checked ? b.color : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              color: "white",
                            }}
                          >
                            {checked && "✓"}
                          </div>
                          {b.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Heures max + niveau expertise */}
                <div
                  className="form-grid"
                  style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}
                >
                  <div className="form-group">
                    <label className="form-label">Heures max / semaine</label>
                    <input
                      className="form-input"
                      type="number"
                      min={1}
                      max={40}
                      value={q.maxHoursWeek}
                      onChange={(e) =>
                        updateQual(i, "maxHoursWeek", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Niveau d'expertise</label>
                    <select
                      className="form-select"
                      value={q.expertiseLevel}
                      onChange={(e) =>
                        updateQual(i, "expertiseLevel", e.target.value)
                      }
                    >
                      <option value="debutant">Débutant</option>
                      <option value="confirme">Confirmé</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Ajouter une matière */}
            <button
              onClick={addQual}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "transparent",
                border: "2px dashed var(--border)",
                borderRadius: 10,
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              ➕ Ajouter une autre matière
            </button>
          </div>
        )}
      </Modal>

      {/* ── Confirm delete ────────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        target={`l'enseignant ${getFullName(deleteTarget || {})}`}
      />
    </div>
  );
}
