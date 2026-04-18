import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import { timetableData } from "../../data/mockData";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// ── Hook fetch générique ──────────────────────────────────────────────────
function useApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const refetch = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    fetch(`${API}${url}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((res) => setData(res.data?.rows || res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    refetch();
  }, [url]);
  return { data, loading, refetch };
}

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Constantes ────────────────────────────────────────────────────────────
const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
const DAY_LABELS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const TIMES = Object.keys(timetableData);

const CATEGORIES = [
  "Sciences exactes",
  "Lettres",
  "Sciences humaines",
  "Arts",
  "Sport",
  "Langues",
  "Technologie",
  "Religion",
  "Autre",
];

const categoryColor = {
  "Sciences exactes": "#3b82f6",
  Lettres: "#10b981",
  "Sciences humaines": "#f59e0b",
  Arts: "#8b5cf6",
  Sport: "#ef4444",
  Langues: "#14b8a6",
  Technologie: "#6366f1",
  Religion: "#ec4899",
  Autre: "#64748b",
};

const EMPTY_SUBJECT = {
  name: "",
  shortCode: "",
  coefficient: 2,
  weeklyHours: 2,
  category: "Sciences exactes",
  description: "",
};

// ══════════════════════════════════════════════════════════════════════════
// SUBJECTS
// ══════════════════════════════════════════════════════════════════════════
export function Subjects({ showToast }) {
  const { data: subjects, loading, refetch } = useApi("/subjects");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_SUBJECT);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // ── CREATE ──────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!form.name || !form.shortCode) {
      showToast("Nom et code court sont obligatoires", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/subjects`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
          name: form.name,
          shortCode: form.shortCode.toUpperCase(),
          coefficient: parseInt(form.coefficient) || 2,
          weeklyHours: parseInt(form.weeklyHours) || 2,
          category: form.category,
          description: form.description || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur création", "error");
        return;
      }
      showToast(
        `Matière "${data.data?.name || form.name}" créée ✅`,
        "success",
      );
      setAddOpen(false);
      setForm(EMPTY_SUBJECT);
      refetch();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── OPEN EDIT ────────────────────────────────────────────────────────────
  const openEdit = (s) => {
    setSelected(s);
    setForm({
      name: s.name || "",
      shortCode: s.shortCode || "",
      coefficient: s.coefficient || 2,
      weeklyHours: s.weeklyHours || 2,
      category: s.category || "Sciences exactes",
      description: s.description || "",
    });
    setEditOpen(true);
  };

  // ── UPDATE ───────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (!form.name || !form.shortCode) {
      showToast("Nom et code court sont obligatoires", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/subjects/${selected.id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({
          name: form.name,
          shortCode: form.shortCode.toUpperCase(),
          coefficient: parseInt(form.coefficient) || 2,
          weeklyHours: parseInt(form.weeklyHours) || 2,
          category: form.category,
          description: form.description || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur modification", "error");
        return;
      }
      showToast(
        `Matière "${data.data?.name || form.name}" modifiée ✅`,
        "success",
      );
      setEditOpen(false);
      setSelected(null);
      setForm(EMPTY_SUBJECT);
      refetch();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ───────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/subjects/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || "Erreur suppression", "error");
        return;
      }
      showToast(`Matière "${deleteTarget.name}" supprimée`, "success");
      setDeleteTarget(null);
      refetch();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    }
  };

  // ── Filtres ──────────────────────────────────────────────────────────────
  const filtered = subjects.filter((s) => {
    const matchSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.shortCode?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || s.category === filterCat;
    return matchSearch && matchCat;
  });

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalHours = subjects.reduce((acc, s) => acc + (s.weeklyHours || 0), 0);
  const avgCoeff = subjects.length
    ? (
        subjects.reduce((acc, s) => acc + (s.coefficient || 0), 0) /
        subjects.length
      ).toFixed(1)
    : 0;

  // ── Formulaire partagé ────────────────────────────────────────────────────
  const SubjectForm = () => (
    <div className="form-grid">
      <div className="form-group">
        <label className="form-label">Nom de la matière *</label>
        <input
          className="form-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex: Mathématiques"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Code court *</label>
        <input
          className="form-input"
          name="shortCode"
          value={form.shortCode}
          onChange={handleChange}
          placeholder="Ex: MATH"
          style={{ textTransform: "uppercase" }}
          maxLength={10}
        />
        <small style={{ color: "var(--text-muted)", fontSize: 11 }}>
          Automatiquement en majuscules
        </small>
      </div>
      <div className="form-group">
        <label className="form-label">Catégorie</label>
        <select
          className="form-select"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Coefficient</label>
        <input
          className="form-input"
          type="number"
          name="coefficient"
          value={form.coefficient}
          onChange={handleChange}
          min={1}
          max={10}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Heures / semaine</label>
        <input
          className="form-input"
          type="number"
          name="weeklyHours"
          value={form.weeklyHours}
          onChange={handleChange}
          min={1}
          max={20}
        />
      </div>
      <div className="form-group" style={{ gridColumn: "1/-1" }}>
        <label className="form-label">Description (optionnel)</label>
        <textarea
          className="form-input"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brève description de la matière…"
          rows={3}
          style={{ resize: "vertical" }}
        />
      </div>
    </div>
  );

  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Matières</span>
            <span className="stat-icon">📚</span>
          </div>
          <div className="stat-value">{subjects.length}</div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <span className="stat-title">Actives</span>
            <span
              className="stat-icon"
              style={{ background: "rgba(16,185,129,.1)", color: "#10b981" }}
            >
              ✓
            </span>
          </div>
          <div className="stat-value">{subjects.length}</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <span className="stat-title">Coeff. Moyen</span>
            <span
              className="stat-icon"
              style={{ background: "rgba(245,158,11,.1)", color: "#f59e0b" }}
            >
              ⚖️
            </span>
          </div>
          <div className="stat-value">{avgCoeff}</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-header">
            <span className="stat-title">Heures / Semaine</span>
            <span
              className="stat-icon"
              style={{ background: "rgba(139,92,246,.1)", color: "#8b5cf6" }}
            >
              ⏱️
            </span>
          </div>
          <div className="stat-value">{totalHours} h</div>
        </div>
      </div>

      {/* Tableau */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Catalogue des Matières</h3>
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
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
            >
              <option value="">Toutes catégories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setAddOpen(true)}
            >
              ➕ Nouvelle Matière
            </button>
          </div>
        </div>

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
            <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
            <p>
              {subjects.length === 0 ? "Aucune matière." : "Aucun résultat."}
            </p>
            {subjects.length === 0 && (
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: 12 }}
                onClick={() => setAddOpen(true)}
              >
                Ajouter la première matière
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Matière</th>
                  <th>Code</th>
                  <th>Catégorie</th>
                  <th>Coeff.</th>
                  <th>H/Sem</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const color = categoryColor[s.category] || "#64748b";
                  return (
                    <tr key={s.id}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              background: color + "22",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 16,
                              color,
                            }}
                          >
                            📘
                          </div>
                          <strong>{s.name}</strong>
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
                          {s.shortCode}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "3px 10px",
                            borderRadius: 20,
                            background: color + "22",
                            color,
                            border: `1px solid ${color}44`,
                          }}
                        >
                          {s.category || "—"}
                        </span>
                      </td>
                      <td>
                        <strong>{s.coefficient}</strong>
                      </td>
                      <td>{s.weeklyHours || "—"}h</td>
                      <td
                        style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.description || "—"}
                      </td>
                      <td>
                        <div className="action-menu">
                          <div
                            className="action-btn"
                            title="Modifier"
                            onClick={() => openEdit(s)}
                          >
                            ✏️
                          </div>
                          <div
                            className="action-btn"
                            title="Supprimer"
                            onClick={() => setDeleteTarget(s)}
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
          </div>
        )}
      </div>

      {/* Modal Créer */}
      <Modal
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          setForm(EMPTY_SUBJECT);
        }}
        title="➕ Nouvelle Matière"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setAddOpen(false);
                setForm(EMPTY_SUBJECT);
              }}
            >
              Annuler
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={saving}
            >
              {saving ? "Création…" : "Ajouter"}
            </button>
          </>
        }
      >
        <SubjectForm />
      </Modal>

      {/* Modal Modifier */}
      <Modal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelected(null);
          setForm(EMPTY_SUBJECT);
        }}
        title={`✏️ Modifier — ${selected?.name || ""}`}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEditOpen(false);
                setSelected(null);
                setForm(EMPTY_SUBJECT);
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
        <SubjectForm />
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        target={`la matière "${deleteTarget?.name}"`}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SCHEDULE  (inchangé — pas d'API définie)
// ══════════════════════════════════════════════════════════════════════════
export function Schedule({ showToast }) {
  return (
    <div className="page-enter">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            Emploi du Temps — Semaine du 25 Fév 2026
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select className="form-select" style={{ width: "auto" }}>
              <option>Toutes les classes</option>
              <option>5A</option>
              <option>6B</option>
              <option>4C</option>
              <option>3A</option>
            </select>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast("PDF exporté", "success")}
            >
              📤 Exporter PDF
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast("Cours ajouté", "success")}
            >
              ➕ Ajouter Cours
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }} className="timetable">
          <table style={{ minWidth: 900 }}>
            <thead>
              <tr>
                <th style={{ width: 90, textAlign: "right" }}>Heure</th>
                {DAY_LABELS.map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMES.map((time, ti) => (
                <>
                  {ti === 2 && (
                    <tr key="break1">
                      <td
                        colSpan={6}
                        style={{
                          background: "rgba(59,130,246,.05)",
                          textAlign: "center",
                          padding: 8,
                          fontSize: 12,
                          color: "var(--text-muted)",
                        }}
                      >
                        ☕ Récréation — 10h00 à 10h15
                      </td>
                    </tr>
                  )}
                  {ti === 4 && (
                    <tr key="break2">
                      <td
                        colSpan={6}
                        style={{
                          background: "rgba(59,130,246,.05)",
                          textAlign: "center",
                          padding: 8,
                          fontSize: 12,
                          color: "var(--text-muted)",
                        }}
                      >
                        🍽️ Pause déjeuner — 12h15 à 13h30
                      </td>
                    </tr>
                  )}
                  <tr key={time}>
                    <td className="time-col">{time}</td>
                    {DAYS.map((day) => {
                      const slot = timetableData[time]?.[day];
                      return (
                        <td key={day}>
                          {slot ? (
                            <div
                              className="slot"
                              style={{
                                background: `${slot.color}1a`,
                                borderLeftColor: slot.color,
                              }}
                            >
                              <div className="slot-title">{slot.title}</div>
                              <div className="slot-info">{slot.info}</div>
                            </div>
                          ) : (
                            <div
                              style={{
                                textAlign: "center",
                                color: "var(--text-muted)",
                                padding: "14px 0",
                              }}
                            >
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// EXAMS  (inchangé — pas d'API définie dans le .env)
// ══════════════════════════════════════════════════════════════════════════
const examStatusBadge = {
  scheduled: "badge-info",
  ongoing: "badge-warning",
  done: "badge-success",
};
const examStatusLabel = {
  scheduled: "Programmé",
  ongoing: "En cours",
  done: "Terminé",
};

export function Exams({ showToast }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Programmés</span>
            <span className="stat-icon">📝</span>
          </div>
          <div className="stat-value">24</div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <span className="stat-title">Terminés</span>
            <span
              className="stat-icon"
              style={{ background: "rgba(16,185,129,.1)", color: "#10b981" }}
            >
              ✓
            </span>
          </div>
          <div className="stat-value">156</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <span className="stat-title">En Correction</span>
            <span
              className="stat-icon"
              style={{ background: "rgba(245,158,11,.1)", color: "#f59e0b" }}
            >
              ⏳
            </span>
          </div>
          <div className="stat-value">18</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Moyenne Générale</span>
            <span className="stat-icon">🎯</span>
          </div>
          <div className="stat-value">14.2/20</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Calendrier des Examens</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast("Vue calendrier", "success")}
            >
              📅 Vue Calendrier
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast("Examen programmé", "success")}
            >
              ➕ Programmer Examen
            </button>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <p>Intégration API examens à venir</p>
        </div>
      </div>
    </div>
  );
}
