import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// ── Hook fetch générique ──────────────────────────────────────────────────
function useApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    fetch(`${API}${url}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((res) => setData(res.data?.rows || res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading };
}

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Constantes ────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  gradeNumber: "",
  division: "A",
  academicYearId: "",
  roomId: "",
  headTeacherId: "",
  maxCapacity: 35,
};
const DIVISIONS = ["A", "B", "C", "D", "E", "F"];
const EMPTY_COURSE = {
  subjectId: "",
  teacherId: "",
  hoursWeek: 2,
  applyToAll: true,
};

function previewName(gradeNumber, division) {
  if (!gradeNumber || !division) return "—";
  const g = parseInt(gradeNumber);
  const suffix = g <= 6 ? "P" : g <= 10 ? "S" : "H";
  return `${g}${suffix}${division}`;
}

const cycleBadge = (cycle) =>
  ({
    PRIMAIRE: { label: "Primaire", color: "#3b82f6" },
    SECONDAIRE: { label: "Secondaire", color: "#10b981" },
    HUMANITES: { label: "Humanités", color: "#8b5cf6" },
  })[cycle] || { label: cycle || "—", color: "#64748b" };

// ── Formulaire classe ─────────────────────────────────────────────────────
function ClassForm({
  form,
  onChange,
  academicYears,
  loadingYears,
  rooms,
  loadingRooms,
}) {
  return (
    <div className="form-grid">
      <div className="form-group" style={{ gridColumn: "1/-1" }}>
        <label className="form-label">Année Académique *</label>
        <select
          className="form-select"
          name="academicYearId"
          value={form.academicYearId}
          onChange={onChange}
        >
          <option value="">— Sélectionner une année —</option>
          {loadingYears ? (
            <option disabled>Chargement…</option>
          ) : (
            academicYears.map((y) => (
              <option key={y.id} value={y.id}>
                {y.label}{" "}
                {y.isCurrent
                  ? "✅ (en cours)"
                  : `• ${y.startDate?.slice(0, 4) || ""} → ${y.endDate?.slice(0, 4) || ""}`}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Niveau *</label>
        <select
          className="form-select"
          name="gradeNumber"
          value={form.gradeNumber}
          onChange={onChange}
        >
          <option value="">— Choisir —</option>
          <optgroup label="🎒 Primaire (1 → 6)">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}ème Primaire
              </option>
            ))}
          </optgroup>
          <optgroup label="📚 Secondaire (7 → 10)">
            {[7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n}ème Secondaire
              </option>
            ))}
          </optgroup>
          <optgroup label="🎓 Humanités (11 → 13)">
            {[11, 12, 13].map((n) => (
              <option key={n} value={n}>
                {n}ème Humanités
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Division *</label>
        <select
          className="form-select"
          name="division"
          value={form.division}
          onChange={onChange}
        >
          {DIVISIONS.map((d) => (
            <option key={d} value={d}>
              Division {d}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group" style={{ gridColumn: "1/-1" }}>
        <label className="form-label">Nom généré automatiquement</label>
        <div
          style={{
            padding: "12px 16px",
            background: "var(--primary)",
            border: "1px solid var(--accent)",
            borderRadius: 8,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            color: "var(--accent)",
            textAlign: "center",
          }}
        >
          {previewName(form.gradeNumber, form.division)}
        </div>
        <small style={{ color: "var(--text-muted)", fontSize: 11 }}>
          Format : [Niveau][Cycle][Division] — ex: 7SB = Niveau 7, Secondaire,
          Division B
        </small>
      </div>
      <div className="form-group">
        <label className="form-label">Capacité max</label>
        <input
          className="form-input"
          type="number"
          name="maxCapacity"
          value={form.maxCapacity}
          onChange={onChange}
          min={1}
          max={60}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Salle (optionnel)</label>
        <select
          className="form-select"
          name="roomId"
          value={form.roomId}
          onChange={onChange}
        >
          <option value="">— Aucune salle —</option>
          {loadingRooms ? (
            <option disabled>Chargement…</option>
          ) : (
            rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.type} (cap. {r.capacity})
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════
export default function Classes({ showToast }) {
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Modals
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false); // ← NOUVEAU

  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [courseForm, setCourseForm] = useState(EMPTY_COURSE); // ← NOUVEAU
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addingCourse, setAddingCourse] = useState(false); // ← NOUVEAU

  // Filtres
  const [filterCycle, setFilterCycle] = useState("");
  const [search, setSearch] = useState("");

  const { data: academicYears, loading: loadingYears } =
    useApi("/academic-years");
  const { data: rooms, loading: loadingRooms } = useApi("/rooms");
  const { data: subjects, loading: loadingSubjects } = useApi("/subjects"); // ← NOUVEAU
  const { data: teachers, loading: loadingTeachers } = useApi("/employees"); // ← NOUVEAU (employees = teachers)

  // ── Fetch classes ─────────────────────────────────────────────────────
  const fetchClasses = () => {
    const token = localStorage.getItem("token");
    setLoadingClasses(true);
    fetch(`${API}/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((res) => setClasses(res.data?.rows || res.data || []))
      .catch(() => setClasses([]))
      .finally(() => setLoadingClasses(false));
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleCourseChange = (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCourseForm((f) => ({ ...f, [e.target.name]: val }));
  };

  // ── Ouvrir modal cours ────────────────────────────────────────────────
  const openAddCourse = (c) => {
    setSelected(c);
    setCourseForm(EMPTY_COURSE);
    setCourseOpen(true);
  };

  // ── Trouver toutes les classes du même niveau (ex: tous les 1P) ───────
  const getSiblingClasses = (cls) => {
    return classes.filter(
      (c) =>
        c.gradeNumber === cls.gradeNumber &&
        c.academicYearId === cls.academicYearId,
    );
  };

  // ── ADD COURSE (avec option "appliquer à tout le niveau") ─────────────
  const handleAddCourse = async () => {
    if (!courseForm.subjectId || !courseForm.teacherId) {
      showToast("Matière et enseignant sont obligatoires", "error");
      return;
    }
    setAddingCourse(true);

    // Si applyToAll → on récupère toutes les classes du même niveau
    const targetClasses = courseForm.applyToAll
      ? getSiblingClasses(selected)
      : [selected];

    const suffix =
      selected.gradeNumber <= 6 ? "P" : selected.gradeNumber <= 10 ? "S" : "H";
    const levelLabel = `${selected.gradeNumber}${suffix}`;

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const cls of targetClasses) {
        const body = {
          classId: cls.id,
          subjectId: parseInt(courseForm.subjectId),
          teacherId: parseInt(courseForm.teacherId), // userId de l'enseignant
          hoursWeek: parseInt(courseForm.hoursWeek) || 2,
        };
        const res = await fetch(`${API}/class-subjects`, {
          method: "POST",
          headers: authHeader(),
          body: JSON.stringify(body),
        });
        if (res.ok) successCount++;
        else errorCount++;
      }

      if (successCount > 0 && errorCount === 0) {
        const msg = courseForm.applyToAll
          ? `✅ Cours ajouté aux ${successCount} classes du niveau ${levelLabel} (${targetClasses.map((c) => c.name).join(", ")})`
          : `✅ Cours ajouté à la classe ${selected.name}`;
        showToast(msg, "success");
      } else if (successCount > 0) {
        showToast(
          `⚠️ ${successCount} réussi(s), ${errorCount} échoué(s)`,
          "warning",
        );
      } else {
        showToast("Erreur lors de l'ajout du cours", "error");
      }

      setCourseOpen(false);
      setSelected(null);
      setCourseForm(EMPTY_COURSE);
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setAddingCourse(false);
    }
  };

  // ── CREATE ────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!form.gradeNumber || !form.division || !form.academicYearId) {
      showToast(
        "Niveau, division et année académique sont obligatoires",
        "error",
      );
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/classes`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
          gradeNumber: parseInt(form.gradeNumber),
          division: form.division,
          academicYearId: parseInt(form.academicYearId),
          maxCapacity: parseInt(form.maxCapacity) || 35,
          ...(form.roomId && { roomId: parseInt(form.roomId) }),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur création", "error");
        return;
      }
      showToast(
        `Classe ${data.data?.name || previewName(form.gradeNumber, form.division)} créée ✅`,
        "success",
      );
      setAddOpen(false);
      setForm(EMPTY_FORM);
      fetchClasses();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── OPEN EDIT ─────────────────────────────────────────────────────────
  const openEdit = (c) => {
    setSelected(c);
    setForm({
      gradeNumber: c.gradeNumber || "",
      division: c.division || "A",
      academicYearId: c.academicYearId || "",
      roomId: c.roomId || "",
      headTeacherId: c.headTeacherId || "",
      maxCapacity: c.maxCapacity || 35,
    });
    setEditOpen(true);
  };

  // ── UPDATE ────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (!form.gradeNumber || !form.division || !form.academicYearId) {
      showToast(
        "Niveau, division et année académique sont obligatoires",
        "error",
      );
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/classes/${selected.id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({
          gradeNumber: parseInt(form.gradeNumber),
          division: form.division,
          academicYearId: parseInt(form.academicYearId),
          maxCapacity: parseInt(form.maxCapacity) || 35,
          roomId: form.roomId ? parseInt(form.roomId) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur modification", "error");
        return;
      }
      showToast(
        `Classe ${data.data?.name || selected.name} modifiée ✅`,
        "success",
      );
      setEditOpen(false);
      setSelected(null);
      setForm(EMPTY_FORM);
      fetchClasses();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API}/classes/${selected.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur suppression", "error");
        return;
      }
      showToast(`Classe ${selected.name} supprimée`, "success");
      setDeleteOpen(false);
      setSelected(null);
      fetchClasses();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setDeleting(false);
    }
  };

  // ── Filtres ───────────────────────────────────────────────────────────
  const filtered = classes.filter((c) => {
    const matchCycle = !filterCycle || c.cycle === filterCycle;
    const matchSearch =
      !search || c.name?.toLowerCase().includes(search.toLowerCase());
    return matchCycle && matchSearch;
  });

  // ── Stats ─────────────────────────────────────────────────────────────
  const total = classes.length;
  const primaire = classes.filter((c) => c.cycle === "PRIMAIRE").length;
  const second = classes.filter((c) => c.cycle === "SECONDAIRE").length;
  const humaines = classes.filter((c) => c.cycle === "HUMANITES").length;

  // ═════════════════════════════════════════════════════════════════════
  // RENDU
  // ═════════════════════════════════════════════════════════════════════
  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid">
        {[
          { title: "Total Classes", value: total, icon: "🏫", color: null },
          { title: "Primaire", value: primaire, icon: "📚", color: "#3b82f6" },
          { title: "Secondaire", value: second, icon: "🎓", color: "#10b981" },
          { title: "Humanités", value: humaines, icon: "🏆", color: "#8b5cf6" },
        ].map(({ title, value, icon, color }) => (
          <div
            className={`stat-card${color === "#10b981" ? " success" : color === "#8b5cf6" ? " purple" : ""}`}
            key={title}
          >
            <div className="stat-header">
              <span className="stat-title">{title}</span>
              <span
                className="stat-icon"
                style={color ? { background: color + "1a", color } : {}}
              >
                {icon}
              </span>
            </div>
            <div
              className="stat-value"
              style={
                color && color !== "#10b981" && color !== "#8b5cf6"
                  ? { color }
                  : {}
              }
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Liste */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Liste des Classes</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div className="search-bar" style={{ width: 200 }}>
              <span className="search-icon">🔍</span>
              <input
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{ width: "auto" }}
              value={filterCycle}
              onChange={(e) => setFilterCycle(e.target.value)}
            >
              <option value="">Tous les cycles</option>
              <option value="PRIMAIRE">Primaire</option>
              <option value="SECONDAIRE">Secondaire</option>
              <option value="HUMANITES">Humanités</option>
            </select>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setAddOpen(true)}
            >
              ➕ Nouvelle Classe
            </button>
          </div>
        </div>

        {loadingClasses ? (
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
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏫</div>
            <p>
              {classes.length === 0
                ? "Aucune classe trouvée."
                : "Aucun résultat pour ce filtre."}
            </p>
            {classes.length === 0 && (
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: 12 }}
                onClick={() => setAddOpen(true)}
              >
                Créer la première classe
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))",
              gap: 16,
            }}
          >
            {filtered.map((c) => {
              const badge = cycleBadge(c.cycle);
              const fill = c.students
                ? Math.round((c.students / c.maxCapacity) * 100)
                : 0;
              const siblings = getSiblingClasses(c);
              const suffix =
                c.gradeNumber <= 6 ? "P" : c.gradeNumber <= 10 ? "S" : "H";

              return (
                <div
                  key={c.id}
                  style={{
                    background: "var(--primary)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: 18,
                    transition: "all .3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  {/* En-tête */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          letterSpacing: 1,
                        }}
                      >
                        {c.name}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        Niveau {c.gradeNumber} • {c.academicYear?.label || "—"}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: badge.color + "22",
                        color: badge.color,
                        border: `1px solid ${badge.color}44`,
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Grille infos */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        background: "var(--secondary)",
                        borderRadius: 8,
                        padding: "8px 12px",
                      }}
                    >
                      <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                        Division
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>
                        {c.division}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "var(--secondary)",
                        borderRadius: 8,
                        padding: "8px 12px",
                      }}
                    >
                      <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                        Capacité max
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>
                        {c.maxCapacity}
                      </div>
                    </div>
                  </div>

                  {/* Frères de niveau */}
                  <div
                    style={{
                      marginBottom: 10,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    {siblings.map((s) => (
                      <span
                        key={s.id}
                        style={{
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 10,
                          background:
                            s.id === c.id
                              ? badge.color + "33"
                              : "var(--secondary)",
                          color:
                            s.id === c.id ? badge.color : "var(--text-muted)",
                          border: `1px solid ${s.id === c.id ? badge.color + "55" : "var(--border)"}`,
                          fontWeight: s.id === c.id ? 700 : 400,
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>

                  {c.room && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 6,
                        fontSize: 13,
                        color: "var(--text-muted)",
                      }}
                    >
                      <span>🏠</span>
                      <span>{c.room.name}</span>
                    </div>
                  )}
                  {c.headTeacher && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 6,
                        fontSize: 13,
                        color: "var(--text-muted)",
                      }}
                    >
                      <span>👤</span>
                      <span>
                        {c.headTeacher.firstName} {c.headTeacher.lastName}
                      </span>
                    </div>
                  )}

                  {fill > 0 && (
                    <div style={{ marginBottom: 14 }}>
                      <div
                        style={{
                          height: 5,
                          background: "var(--border)",
                          borderRadius: 3,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${fill}%`,
                            background:
                              fill > 90
                                ? "#ef4444"
                                : fill > 70
                                  ? "#f59e0b"
                                  : "#10b981",
                            borderRadius: 3,
                            transition: "width .4s",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--text-muted)",
                          marginTop: 4,
                        }}
                      >
                        Remplissage : {fill}%
                      </div>
                    </div>
                  )}

                  {/* ── Actions ── */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginTop: 12,
                    }}
                  >
                    {/* Bouton Ajouter Cours — mis en valeur */}
                    <button
                      onClick={() => openAddCourse(c)}
                      style={{
                        width: "100%",
                        padding: "9px 0",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        border: "none",
                        borderRadius: 9,
                        color: "white",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      📚 Ajouter un cours
                      <span
                        style={{ fontSize: 10, opacity: 0.8, fontWeight: 400 }}
                      >
                        → tout le niveau {c.gradeNumber}
                        {suffix}
                      </span>
                    </button>

                    {/* Détails / Modifier / Supprimer */}
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => {
                          setSelected(c);
                          setDetailOpen(true);
                        }}
                      >
                        👁 Détails
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => openEdit(c)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => {
                          setSelected(c);
                          setDeleteOpen(true);
                        }}
                        style={{
                          padding: "6px 10px",
                          background: "rgba(239,68,68,.1)",
                          border: "1px solid rgba(239,68,68,.3)",
                          borderRadius: 8,
                          color: "#f87171",
                          cursor: "pointer",
                          fontSize: 14,
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          Modal — AJOUTER UN COURS
      ══════════════════════════════════════════════════════════════════ */}
      {selected &&
        courseOpen &&
        (() => {
          const siblings = getSiblingClasses(selected);
          const suffix =
            selected.gradeNumber <= 6
              ? "P"
              : selected.gradeNumber <= 10
                ? "S"
                : "H";
          const levelLabel = `${selected.gradeNumber}${suffix}`;
          return (
            <Modal
              isOpen={courseOpen}
              onClose={() => {
                setCourseOpen(false);
                setSelected(null);
                setCourseForm(EMPTY_COURSE);
              }}
              title={`📚 Ajouter un cours — Niveau ${levelLabel}`}
              footer={
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setCourseOpen(false);
                      setSelected(null);
                      setCourseForm(EMPTY_COURSE);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddCourse}
                    disabled={addingCourse}
                    style={{
                      padding: "10px 20px",
                      background: "linear-gradient(135deg,#10b981,#059669)",
                      border: "none",
                      borderRadius: 10,
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: addingCourse ? 0.7 : 1,
                    }}
                  >
                    {addingCourse
                      ? "Ajout en cours…"
                      : `Ajouter${courseForm.applyToAll ? ` aux ${siblings.length} classes` : " à cette classe"}`}
                  </button>
                </>
              }
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                {/* Option appliquer à tout le niveau */}
                <div
                  style={{
                    background: courseForm.applyToAll
                      ? "rgba(16,185,129,.1)"
                      : "var(--primary)",
                    border: `1px solid ${courseForm.applyToAll ? "#10b98155" : "var(--border)"}`,
                    borderRadius: 12,
                    padding: 16,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setCourseForm((f) => ({ ...f, applyToAll: !f.applyToAll }))
                  }
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        border: `2px solid ${courseForm.applyToAll ? "#10b981" : "var(--border)"}`,
                        background: courseForm.applyToAll
                          ? "#10b981"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {courseForm.applyToAll && "✓"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>
                        Appliquer à tout le niveau {levelLabel}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        Le cours sera ajouté simultanément à :
                        <span style={{ color: "#10b981", fontWeight: 600 }}>
                          {" "}
                          {siblings.map((s) => s.name).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Si pas applyToAll → afficher seulement la classe sélectionnée */}
                {!courseForm.applyToAll && (
                  <div
                    style={{
                      background: "rgba(59,130,246,.08)",
                      border: "1px solid rgba(59,130,246,.25)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "#93c5fd",
                    }}
                  >
                    ℹ️ Le cours sera ajouté uniquement à la classe{" "}
                    <strong>{selected.name}</strong>
                  </div>
                )}

                <div className="form-grid">
                  {/* Matière */}
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">Matière *</label>
                    <select
                      className="form-select"
                      name="subjectId"
                      value={courseForm.subjectId}
                      onChange={handleCourseChange}
                    >
                      <option value="">— Sélectionner une matière —</option>
                      {loadingSubjects ? (
                        <option disabled>Chargement…</option>
                      ) : (
                        subjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} {s.shortCode ? `(${s.shortCode})` : ""}{" "}
                            {s.coefficient ? `— Coeff. ${s.coefficient}` : ""}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Enseignant */}
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">Enseignant *</label>
                    <select
                      className="form-select"
                      name="teacherId"
                      value={courseForm.teacherId}
                      onChange={handleCourseChange}
                    >
                      <option value="">— Sélectionner un enseignant —</option>
                      {loadingTeachers ? (
                        <option disabled>Chargement…</option>
                      ) : (
                        teachers
                          .filter((t) => t.user)
                          .map((t) => (
                            <option key={t.id} value={t.user.id}>
                              {t.user.firstName} {t.user.lastName}
                              {t.position ? ` — ${t.position}` : ""}
                              {t.employeeCode ? ` (${t.employeeCode})` : ""}
                            </option>
                          ))
                      )}
                    </select>
                  </div>

                  {/* Heures / semaine */}
                  <div className="form-group">
                    <label className="form-label">Heures / semaine</label>
                    <input
                      className="form-input"
                      type="number"
                      name="hoursWeek"
                      value={courseForm.hoursWeek}
                      onChange={handleCourseChange}
                      min={1}
                      max={20}
                    />
                  </div>

                  {/* Résumé */}
                  {courseForm.subjectId && courseForm.teacherId && (
                    <div className="form-group" style={{ gridColumn: "1/-1" }}>
                      <div
                        style={{
                          background: "var(--primary)",
                          border: "1px solid var(--accent)",
                          borderRadius: 10,
                          padding: 14,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--text-muted)",
                            marginBottom: 8,
                          }}
                        >
                          📋 RÉSUMÉ
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                          <div>
                            📚 Matière :{" "}
                            <strong>
                              {subjects.find(
                                (s) => s.id == courseForm.subjectId,
                              )?.name || "—"}
                            </strong>
                          </div>
                          <div>
                            👤 Enseignant :{" "}
                            <strong>
                              {(() => {
                                const t = teachers.find(
                                  (t) => t.id == courseForm.teacherId,
                                );
                                return t
                                  ? `${t.firstName || t.first_name} ${t.lastName || t.last_name}`
                                  : "—";
                              })()}
                            </strong>
                          </div>
                          <div>
                            ⏱️ Heures/semaine :{" "}
                            <strong>{courseForm.hoursWeek}h</strong>
                          </div>
                          <div>
                            🏫 Classes concernées :{" "}
                            <strong style={{ color: "#10b981" }}>
                              {courseForm.applyToAll
                                ? siblings.map((s) => s.name).join(", ")
                                : selected.name}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Modal>
          );
        })()}

      {/* Modal CRÉER */}
      <Modal
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          setForm(EMPTY_FORM);
        }}
        title="➕ Nouvelle Classe"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setAddOpen(false);
                setForm(EMPTY_FORM);
              }}
            >
              Annuler
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={saving}
            >
              {saving ? "Création…" : "Créer la classe"}
            </button>
          </>
        }
      >
        <ClassForm
          form={form}
          onChange={handleChange}
          academicYears={academicYears}
          loadingYears={loadingYears}
          rooms={rooms}
          loadingRooms={loadingRooms}
        />
      </Modal>

      {/* Modal MODIFIER */}
      <Modal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelected(null);
          setForm(EMPTY_FORM);
        }}
        title={`✏️ Modifier — ${selected?.name || ""}`}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEditOpen(false);
                setSelected(null);
                setForm(EMPTY_FORM);
              }}
            >
              Annuler
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={saving}
            >
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </>
        }
      >
        <ClassForm
          form={form}
          onChange={handleChange}
          academicYears={academicYears}
          loadingYears={loadingYears}
          rooms={rooms}
          loadingRooms={loadingRooms}
        />
      </Modal>

      {/* Modal DÉTAILS */}
      {selected && !courseOpen && (
        <Modal
          isOpen={detailOpen}
          onClose={() => {
            setDetailOpen(false);
            setSelected(null);
          }}
          title={`🏫 Classe ${selected.name}`}
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setDetailOpen(false);
                  setSelected(null);
                }}
              >
                Fermer
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDetailOpen(false);
                  openEdit(selected);
                }}
              >
                ✏️ Modifier
              </button>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {(() => {
                const b = cycleBadge(selected.cycle);
                return (
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "6px 18px",
                      borderRadius: 20,
                      background: b.color + "22",
                      color: b.color,
                      border: `1px solid ${b.color}44`,
                    }}
                  >
                    {b.label}
                  </span>
                );
              })()}
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: 4,
                color: "var(--accent)",
              }}
            >
              {selected.name}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 12,
              }}
            >
              {[
                ["📊 Niveau", selected.gradeNumber],
                ["🔤 Division", selected.division],
                ["👥 Capacité max", selected.maxCapacity],
                ["📅 Année acad.", selected.academicYear?.label || "—"],
                ["🏠 Salle", selected.room?.name || "—"],
                [
                  "👤 Prof. titulaire",
                  selected.headTeacher
                    ? `${selected.headTeacher.firstName} ${selected.headTeacher.lastName}`
                    : "—",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "var(--primary)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal SUPPRIMER */}
      {selected && !courseOpen && (
        <Modal
          isOpen={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
            setSelected(null);
          }}
          title="🗑️ Confirmer la suppression"
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setDeleteOpen(false);
                  setSelected(null);
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: "10px 20px",
                  background: "#ef4444",
                  border: "none",
                  borderRadius: 10,
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? "Suppression…" : "Oui, supprimer"}
              </button>
            </>
          }
        >
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 50, marginBottom: 16 }}>⚠️</div>
            <p style={{ fontSize: 16, marginBottom: 8 }}>
              Voulez-vous vraiment supprimer la classe
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#ef4444",
                letterSpacing: 3,
                marginBottom: 16,
              }}
            >
              {selected.name}
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Cette action est irréversible.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
