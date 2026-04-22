import { useState, useEffect, useCallback, useRef } from "react";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";

// ─── Config API ────────────────────────────────────────────────────────────────
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
// ✅ URL de base du serveur (sans /api/v1) pour construire les URLs des images
const SERVER_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1"
).replace(/\/api\/v1\/?$/, "");

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/**
 * ✅ Construit l'URL complète d'une photo stockée sur le serveur.
 * photoUrl peut être :
 *   - null / ''          → null (pas de photo)
 *   - '/uploads/photos/photo_xxx.jpg'  → http://localhost:3000/uploads/photos/photo_xxx.jpg
 *   - 'http://...'       → inchangé
 */
const buildPhotoUrl = (photoUrl) => {
  if (!photoUrl) return null;
  if (photoUrl.startsWith("http")) return photoUrl;
  return `${SERVER_URL}${photoUrl}`;
};

const api = {
  getStudents: async () => {
    const res = await fetch(`${BASE_URL}/students`, { headers: authHeader() });
    if (!res.ok) throw new Error("Erreur chargement élèves");
    return res.json();
  },
  getClasses: async () => {
    const res = await fetch(`${BASE_URL}/classes`, { headers: authHeader() });
    if (!res.ok) throw new Error("Erreur chargement classes");
    return res.json();
  },
  createStudent: async (data) => {
    const res = await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || `Erreur ${res.status}`);
    return json;
  },
  updateStudent: async (id, data) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || `Erreur ${res.status}`);
    return json;
  },
  deleteStudent: async (id) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    if (!res.ok) throw new Error("Erreur suppression");
    return true;
  },
  // ✅ Upload photo — lève une vraie erreur au lieu de retourner null silencieusement
  uploadPhoto: async (file) => {
    const fd = new FormData();
    fd.append("photo", file);
    // ⚠️ Ne PAS mettre Content-Type ici, le browser le gère automatiquement pour FormData
    const res = await fetch(`${BASE_URL}/upload/photo`, {
      method: "POST",
      headers: authHeader(),
      body: fd,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || "Erreur upload photo");
    return json.photoUrl ?? null; // ex: '/uploads/photos/photo_1234.jpg'
  },
  createParent: async (data) => {
    const res = await fetch(`${BASE_URL}/parents`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || "Erreur création parent");
    return json;
  },
  linkParentToStudent: async (studentId, parents) => {
    const res = await fetch(`${BASE_URL}/students/${studentId}/parents`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(parents),
    });
    if (!res.ok) throw new Error("Erreur liaison parent-élève");
    return res.json();
  },
};

// ─── Constantes ───────────────────────────────────────────────────────────────
const CYCLES = [
  { value: "primaire", label: "🏫 Primaire", color: "#6366f1" },
  { value: "secondaire", label: "📚 Secondaire", color: "#10b981" },
  { value: "humanites", label: "🎓 Humanités", color: "#f59e0b" },
];

const EMPTY_STUDENT = {
  firstName: "",
  lastName: "",
  studentCode: "",
  dateOfBirth: "",
  placeOfBirth: "",
  gender: "M",
  address: "",
  city: "",
  postalCode: "",
  nationality: "burundaise",
  phone: "",
  email: "",
  photoUrl: "",
  scholarshipType: "",
  medicalNotes: "",
  classId: "",
  status: "active",
};

const EMPTY_PARENT = {
  firstName: "",
  lastName: "",
  email: "",
  phoneMobile: "",
  profession: "",
  address: "",
  relationship: "",
  isEmergencyContact: false,
};

const STEPS = [
  "Infos personnelles",
  "Classe",
  "Parent / Tuteur",
  "Récapitulatif",
];

const spotsLeft = (cls, allStudents) => {
  if (!cls.maxCapacity) return "∞";
  const enrolled = allStudents.filter(
    (s) => Number(s.classId) === Number(cls.id),
  ).length;
  return cls.maxCapacity - enrolled;
};

// ─── Avatar générique ─────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
];
const avatarColor = (name = "") =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

// ─── Composant Avatar ─────────────────────────────────────────────────────────
function StudentAvatar({ student, size = 34, style = {} }) {
  const url = buildPhotoUrl(student?.photoUrl);
  const initials =
    `${(student?.firstName ?? "?")[0]}${(student?.lastName ?? "?")[0]}`.toUpperCase();
  const bg = avatarColor(student?.firstName);
  if (url) {
    return (
      <img
        src={url}
        alt={initials}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          ...style,
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.36,
        flexShrink: 0,
        ...style,
      }}
    >
      {initials}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MODAL PROFIL DÉTAILLÉ — Style école internationale
// ══════════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════════
// MODAL PROFIL DÉTAILLÉ — Fiche élève complète avec onglets + impression
// ══════════════════════════════════════════════════════════════════════════════
function StudentProfileModal({ student, classes, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState("identity");

  if (!student) return null;

  const cls = classes.find((c) => c.id === Number(student.classId));
  const clsName = cls
    ? (cls.name ?? `${cls.gradeNumber ?? ""}${cls.division ?? ""}`)
    : "—";
  const photoUrl = buildPhotoUrl(student.photoUrl);

  const statusMeta = {
    active: {
      label: "Actif",
      color: "#15803d",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    inactive: {
      label: "Inactif",
      color: "#b45309",
      bg: "#fffbeb",
      border: "#fde68a",
    },
    suspended: {
      label: "Suspendu",
      color: "#b91c1c",
      bg: "#fef2f2",
      border: "#fecaca",
    },
    transferred: {
      label: "Transféré",
      color: "#6d28d9",
      bg: "#f5f3ff",
      border: "#ddd6fe",
    },
    graduated: {
      label: "Diplômé",
      color: "#0369a1",
      bg: "#f0f9ff",
      border: "#bae6fd",
    },
    excluded: {
      label: "Exclu",
      color: "#991b1b",
      bg: "#fef2f2",
      border: "#fecaca",
    },
  };
  const sm = statusMeta[student.status] ?? statusMeta.inactive;

  // ── Infos ligne ──
  const InfoRow = ({ label, value, fullWidth = false }) =>
    value ? (
      <div
        style={{
          padding: "7px 0",
          borderBottom: "0.5px solid var(--border)",
          gridColumn: fullWidth ? "1/-1" : undefined,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: ".06em",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--text-primary)",
            fontWeight: 500,
          }}
        >
          {value}
        </div>
      </div>
    ) : null;

  // ── Section ──
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#4338ca",
          textTransform: "uppercase",
          letterSpacing: ".07em",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 16,
            height: 2,
            background: "#4338ca",
            borderRadius: 1,
          }}
        />
        {title}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 24px",
        }}
      >
        {children}
      </div>
    </div>
  );

  // ── Contenu onglet Identité ──
  const TabIdentity = (
    <div>
      <Section title="Informations personnelles">
        <InfoRow
          label="Date de naissance"
          value={
            student.dateOfBirth
              ? new Date(student.dateOfBirth).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : null
          }
        />
        <InfoRow label="Lieu de naissance" value={student.placeOfBirth} />
        <InfoRow
          label="Genre"
          value={student.gender === "F" ? "Féminin" : "Masculin"}
        />
        <InfoRow label="Nationalité" value={student.nationality} />
        <InfoRow label="Téléphone" value={student.phone} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Adresse" value={student.address} fullWidth />
        <InfoRow label="Ville" value={student.city} />
        <InfoRow label="Code postal" value={student.postalCode} />
      </Section>

      <Section title="Scolarité">
        <InfoRow label="Classe" value={clsName} />
        <InfoRow label="Niveau" value={cls?.cycle} />
        <InfoRow label="Code élève" value={student.studentCode} />
        <InfoRow label="Type de bourse" value={student.scholarshipType} />
        <InfoRow label="Statut" value={sm.label} />
      </Section>

      {student.medicalNotes && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#b45309",
              textTransform: "uppercase",
              letterSpacing: ".07em",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 16,
                height: 2,
                background: "#b45309",
                borderRadius: 1,
              }}
            />
            Notes médicales
          </div>
          <div
            style={{
              background: "#fef9ec",
              border: "0.5px solid #fde68a",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              color: "#78350f",
              lineHeight: 1.5,
            }}
          >
            {student.medicalNotes}
          </div>
        </div>
      )}
    </div>
  );

  // ── Contenu onglet Parents ──
  const TabParents = (
    <div
      style={{
        textAlign: "center",
        padding: "32px 0",
        color: "var(--text-muted)",
        fontSize: 13,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>👨‍👩‍👧</div>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>Parents / Tuteurs</div>
      <div>Cette section sera disponible prochainement.</div>
    </div>
  );

  // ── Contenu onglet Notes ──
  const TabNotes = (
    <div
      style={{
        textAlign: "center",
        padding: "32px 0",
        color: "var(--text-muted)",
        fontSize: 13,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>Bulletins & Notes</div>
      <div>Cette section sera disponible prochainement.</div>
    </div>
  );

  // ── Contenu onglet Documents ──
  const TabDocuments = (
    <div
      style={{
        textAlign: "center",
        padding: "32px 0",
        color: "var(--text-muted)",
        fontSize: 13,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>Documents</div>
      <div>Cette section sera disponible prochainement.</div>
    </div>
  );

  const tabs = [
    { key: "identity", label: "Identité" },
    { key: "parents", label: "Parents" },
    { key: "notes", label: "Notes" },
    { key: "documents", label: "Documents" },
  ];

  const tabContent = {
    identity: TabIdentity,
    parents: TabParents,
    notes: TabNotes,
    documents: TabDocuments,
  };

  // ── Impression ──
  const handlePrint = () => {
    const printWin = window.open("", "_blank", "width=900,height=700");
    const fullName = `${student.firstName} ${student.lastName}`;
    const dobStr = student.dateOfBirth
      ? new Date(student.dateOfBirth).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "—";
    const rows = [
      ["Prénom", student.firstName ?? "—"],
      ["Nom", student.lastName ?? "—"],
      ["Code élève", student.studentCode ?? "—"],
      ["Date de naissance", dobStr],
      ["Lieu de naissance", student.placeOfBirth ?? "—"],
      ["Genre", student.gender === "F" ? "Féminin" : "Masculin"],
      ["Nationalité", student.nationality ?? "—"],
      ["Téléphone", student.phone ?? "—"],
      ["Email", student.email ?? "—"],
      ["Adresse", student.address ?? "—"],
      ["Ville", student.city ?? "—"],
      ["Classe", clsName],
      ["Niveau", cls?.cycle ?? "—"],
      ["Bourse", student.scholarshipType ?? "—"],
      ["Statut", sm.label],
    ];
    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>Fiche élève — ${fullName}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 32px; }
          .header { display: flex; align-items: center; gap: 20px; padding-bottom: 20px; border-bottom: 2px solid #1e1b4b; margin-bottom: 24px; }
          .school-logo { font-size: 28px; }
          .school-name { font-size: 18px; font-weight: 700; color: #1e1b4b; }
          .school-sub { font-size: 12px; color: #64748b; }
          .fiche-title { font-size: 14px; font-weight: 700; color: #4338ca; text-align: right; margin-left: auto; }
          .avatar { width: 72px; height: 72px; border-radius: 10px; background: #4338ca; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: 700; flex-shrink: 0; }
          .student-name { font-size: 22px; font-weight: 700; color: #1e1b4b; }
          .student-code { font-size: 13px; color: #64748b; font-family: monospace; }
          .status { display: inline-block; font-size: 11px; padding: 2px 10px; border-radius: 20px; background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; margin-top: 4px; }
          .section-title { font-size: 11px; font-weight: 700; color: #4338ca; text-transform: uppercase; letter-spacing: .07em; margin: 20px 0 10px; border-left: 3px solid #4338ca; padding-left: 8px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 7px 10px; font-size: 13px; border-bottom: 1px solid #e2e8f0; }
          td:first-child { color: #64748b; font-weight: 500; width: 40%; }
          td:last-child { color: #1e293b; font-weight: 600; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; }
          .medical { background: #fef9ec; border: 1px solid #fde68a; border-radius: 6px; padding: 10px 12px; font-size: 12px; color: #78350f; margin-top: 8px; }
          @media print { body { padding: 16px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="school-logo">🏫</div>
          <div>
            <div class="school-name">École — Bujumbura</div>
            <div class="school-sub">Fiche officielle d'élève</div>
          </div>
          <div class="fiche-title">Fiche élève<br/><span style="font-size:11px;color:#94a3b8;">Imprimé le ${new Date().toLocaleDateString("fr-FR")}</span></div>
        </div>

        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <div class="avatar">${(student.firstName[0] ?? "") + (student.lastName[0] ?? "")}</div>
          <div>
            <div class="student-name">${fullName}</div>
            <div class="student-code">#${student.studentCode ?? "—"}</div>
            <div class="status">${sm.label}</div>
          </div>
        </div>

        <div class="section-title">Informations personnelles</div>
        <table>
          ${rows.map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join("")}
        </table>

        ${
          student.medicalNotes
            ? `
          <div class="section-title">Notes médicales</div>
          <div class="medical">${student.medicalNotes}</div>
        `
            : ""
        }

        <div class="footer">
          <span>Document confidentiel — usage interne uniquement</span>
          <span>Page 1/1</span>
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => printWin.print(), 400);
  };

  // ── Rendu ──
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15,23,42,.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "100%",
          maxWidth: 720,
          maxHeight: "92vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,.25)",
        }}
      >
        {/* ── Hero ── */}
        <div
          style={{
            background: "linear-gradient(135deg,#1e1b4b,#4338ca)",
            padding: "20px 24px 16px",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(255,255,255,.15)",
              border: "none",
              color: "#fff",
              width: 28,
              height: 28,
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
            {/* Avatar */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 10,
                overflow: "hidden",
                background: "#4338ca",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,.25)",
                flexShrink: 0,
              }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>
                  {`${(student.firstName ?? "?")[0]}${(student.lastName ?? "?")[0]}`.toUpperCase()}
                </span>
              )}
            </div>

            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {student.firstName} {student.lastName}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontWeight: 600,
                    background: sm.bg,
                    color: sm.color,
                    border: `1px solid ${sm.border}`,
                  }}
                >
                  {sm.label}
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {student.studentCode && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,.65)",
                      fontFamily: "monospace",
                    }}
                  >
                    #{student.studentCode}
                  </span>
                )}
                {cls && (
                  <span
                    style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}
                  >
                    {clsName} — {cls.cycle}
                  </span>
                )}
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
                  {student.gender === "F" ? "Féminin" : "Masculin"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div
          style={{
            display: "flex",
            borderBottom: "0.5px solid var(--border)",
            background: "var(--bg-secondary)",
            overflowX: "auto",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "10px 18px",
                fontSize: 13,
                cursor: "pointer",
                border: "none",
                borderBottom:
                  activeTab === t.key
                    ? "2px solid #4338ca"
                    : "2px solid transparent",
                background: "transparent",
                color:
                  activeTab === t.key ? "#4338ca" : "var(--text-secondary)",
                fontWeight: activeTab === t.key ? 600 : 400,
                flexShrink: 0,
                transition: "all .15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Contenu ── */}
        <div style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>
          {tabContent[activeTab]}
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding: "12px 24px",
            borderTop: "0.5px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--bg-secondary)",
          }}
        >
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Dossier élève — {new Date().toLocaleDateString("fr-FR")}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "#fff",
                fontSize: 12,
                cursor: "pointer",
                color: "var(--text-secondary)",
              }}
            >
              Fermer
            </button>
            <button
              onClick={handlePrint}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #bbf7d0",
                background: "#f0fdf4",
                fontSize: 12,
                cursor: "pointer",
                color: "#15803d",
                fontWeight: 600,
              }}
            >
              🖨️ Imprimer
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit && onEdit(student);
              }}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg,#6366f1,#4338ca)",
                color: "#fff",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ✏️ Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
export default function Students({ showToast }) {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDelTarget] = useState(null);
  const [profileTarget, setProfileTarget] = useState(null); // ✅ profil détaillé

  const [step, setStep] = useState(0);
  const [studentForm, setStudentForm] = useState(EMPTY_STUDENT);
  const [parentForm, setParentForm] = useState(EMPTY_PARENT);
  const [saving, setSaving] = useState(false);

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPreview] = useState(null);
  const [selectedCycle, setCycle] = useState("");
  const fileRef = useRef();

  // ─── Fetch ─────────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        api.getStudents(),
        api.getClasses(),
      ]);
      setStudents(Array.isArray(sRes) ? sRes : (sRes.data ?? []));
      setClasses(Array.isArray(cRes) ? cRes : (cRes.data ?? []));
    } catch (e) {
      showToast(e.message, "danger");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ─── Filtrage ──────────────────────────────────────────────────────────────
  const filtered = students.filter((s) => {
    const name = `${s.firstName ?? ""} ${s.lastName ?? ""}`.toLowerCase();
    const ok1 =
      name.includes(search.toLowerCase()) ||
      (s.studentCode ?? "").toLowerCase().includes(search.toLowerCase());
    const ok2 = !classFilter || String(s.classId) === classFilter;
    return ok1 && ok2;
  });

  const classesByCycle = classes.filter(
    (c) => !selectedCycle || (c.cycle ?? "").toLowerCase() === selectedCycle,
  );

  // ─── Photo ────────────────────────────────────────────────────────────────
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image trop lourde (max 5 Mo)", "danger");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result); // preview local uniquement
    reader.readAsDataURL(file);
  };

  // ─── Modals ───────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditTarget(null);
    setStudentForm(EMPTY_STUDENT);
    setParentForm(EMPTY_PARENT);
    setPhotoFile(null);
    setPreview(null);
    setCycle("");
    setStep(0);
    setModalOpen(true);
  };

  const openEdit = (s) => {
    const cls = classes.find((c) => c.id === s.classId);
    setEditTarget(s);
    setStudentForm({
      firstName: s.firstName ?? "",
      lastName: s.lastName ?? "",
      studentCode: s.studentCode ?? "",
      dateOfBirth: (s.dateOfBirth ?? "").slice(0, 10),
      placeOfBirth: s.placeOfBirth ?? "",
      gender: s.gender ?? "M",
      address: s.address ?? "",
      city: s.city ?? "",
      postalCode: s.postalCode ?? "",
      nationality: s.nationality ?? "burundaise",
      phone: s.phone ?? "",
      email: s.email ?? "",
      photoUrl: s.photoUrl ?? "",
      scholarshipType: s.scholarshipType ?? "",
      medicalNotes: s.medicalNotes ?? "",
      classId: s.classId ?? "",
      status: s.status ?? "active",
    });
    setParentForm(EMPTY_PARENT);
    setPhotoFile(null);
    setPreview(buildPhotoUrl(s.photoUrl)); // ✅ preview depuis le serveur
    setCycle((cls?.cycle ?? "").toLowerCase());
    setStep(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  // ─── Soumission ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    const { firstName, lastName, dateOfBirth, classId } = studentForm;
    if (!firstName.trim() || !lastName.trim())
      return showToast("Prénom et nom obligatoires", "danger");
    if (!dateOfBirth)
      return showToast("La date de naissance est obligatoire", "danger");
    if (!classId) return showToast("Veuillez choisir une classe", "danger");

    setSaving(true);
    try {
      // ✅ Upload réel si un fichier a été sélectionné
      let finalPhotoUrl = studentForm.photoUrl;
      if (photoFile) {
        try {
          const uploaded = await api.uploadPhoto(photoFile);
          if (uploaded) finalPhotoUrl = uploaded; // '/uploads/photos/photo_xxx.jpg'
        } catch (uploadErr) {
          showToast(`Photo non enregistrée : ${uploadErr.message}`, "warning");
          finalPhotoUrl = "";
        }
      }

      const payload = {
        ...studentForm,
        photoUrl: finalPhotoUrl,
        classId: Number(classId),
      };

      if (editTarget) {
        await api.updateStudent(editTarget.id, payload);
        showToast("Élève modifié avec succès ✓", "success");
      } else {
        const newStudent = await api.createStudent(payload);
        const studentId = newStudent.id ?? newStudent.data?.id;
        if (parentForm.firstName.trim()) {
          const newParent = await api.createParent(parentForm);
          const parentId = newParent.id ?? newParent.data?.id;
          await api.linkParentToStudent(studentId, [
            { parentId, isPrimary: true },
          ]);
        }
        showToast("Élève créé avec succès ✓", "success");
      }
      closeModal();
      fetchAll();
    } catch (e) {
      showToast(e.message, "danger");
    } finally {
      setSaving(false);
    }
  };

  // ─── Suppression ─────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.deleteStudent(deleteTarget.id);
      showToast("Élève supprimé", "danger");
      setDelTarget(null);
      fetchAll();
    } catch (e) {
      showToast(e.message, "danger");
    }
  };

  const total = students.length;
  const actifs = students.filter((s) => s.status === "active").length;

  const SF = (key, val) => setStudentForm((f) => ({ ...f, [key]: val }));

  // ── Étape 1 — Infos personnelles ──────────────────────────────────────────
  const StepPersonal = (
    <div className="form-grid">
      <div
        className="form-group"
        style={{
          gridColumn: "1/-1",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "2px dashed var(--border)",
            cursor: "pointer",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-secondary)",
            fontSize: 28,
          }}
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "📷"
          )}
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => fileRef.current?.click()}
          >
            {photoPreview ? "🔄 Changer" : "📁 Choisir une photo"}
          </button>
          {photoPreview && (
            <button
              type="button"
              className="btn btn-sm"
              style={{ marginLeft: 8, color: "var(--danger)" }}
              onClick={() => {
                setPreview(null);
                setPhotoFile(null);
                SF("photoUrl", "");
              }}
            >
              ✕
            </button>
          )}
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
            JPG / PNG / WEBP — max 5 Mo
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
      </div>

      {[
        { label: "Prénom *", key: "firstName", placeholder: "Marie" },
        { label: "Nom *", key: "lastName", placeholder: "Mbonimpa" },
        {
          label: "Code élève",
          key: "studentCode",
          placeholder: "STU-2024-001",
        },
      ].map(({ label, key, placeholder }) => (
        <div className="form-group" key={key}>
          <label className="form-label">{label}</label>
          <input
            className="form-input"
            value={studentForm[key]}
            onChange={(e) => SF(key, e.target.value)}
            placeholder={placeholder}
          />
        </div>
      ))}

      <div className="form-group">
        <label className="form-label">Genre</label>
        <select
          className="form-select"
          value={studentForm.gender}
          onChange={(e) => SF("gender", e.target.value)}
        >
          <option value="M">♂ Masculin</option>
          <option value="F">♀ Féminin</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Date de naissance *</label>
        <input
          className="form-input"
          type="date"
          value={studentForm.dateOfBirth}
          onChange={(e) => SF("dateOfBirth", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Lieu de naissance</label>
        <input
          className="form-input"
          value={studentForm.placeOfBirth}
          onChange={(e) => SF("placeOfBirth", e.target.value)}
          placeholder="Bujumbura"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Nationalité</label>
        <input
          className="form-input"
          value={studentForm.nationality}
          onChange={(e) => SF("nationality", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Statut</label>
        <select
          className="form-select"
          value={studentForm.status}
          onChange={(e) => SF("status", e.target.value)}
        >
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="suspended">Suspendu</option>
        </select>
      </div>
      <div className="form-group" style={{ gridColumn: "1/-1" }}>
        <label className="form-label">Adresse</label>
        <input
          className="form-input"
          value={studentForm.address}
          onChange={(e) => SF("address", e.target.value)}
          placeholder="Quartier, rue..."
        />
      </div>
      {[
        { label: "Ville", key: "city", placeholder: "Bujumbura" },
        { label: "Téléphone", key: "phone", placeholder: "+25712345678" },
        { label: "Email", key: "email", placeholder: "marie@edu.bi" },
        {
          label: "Type de bourse",
          key: "scholarshipType",
          placeholder: "Nationale...",
        },
      ].map(({ label, key, placeholder }) => (
        <div className="form-group" key={key}>
          <label className="form-label">{label}</label>
          <input
            className="form-input"
            value={studentForm[key]}
            onChange={(e) => SF(key, e.target.value)}
            placeholder={placeholder}
          />
        </div>
      ))}
      <div className="form-group" style={{ gridColumn: "1/-1" }}>
        <label className="form-label">Notes médicales</label>
        <textarea
          className="form-input"
          rows={2}
          value={studentForm.medicalNotes}
          onChange={(e) => SF("medicalNotes", e.target.value)}
          placeholder="Allergies, conditions particulières..."
        />
      </div>
    </div>
  );

  // ── Étape 2 — Classe ──────────────────────────────────────────────────────
  const selectedClass = classes.find(
    (c) => c.id === Number(studentForm.classId),
  );

  const StepClass = (
    <div>
      <p className="form-label" style={{ marginBottom: 10 }}>
        1. Sélectionnez le niveau
      </p>
      <div
        style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}
      >
        {CYCLES.map((cy) => (
          <button
            key={cy.value}
            type="button"
            onClick={() => {
              setCycle(cy.value);
              SF("classId", "");
            }}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              border: "2px solid",
              borderColor:
                selectedCycle === cy.value ? cy.color : "var(--border)",
              background:
                selectedCycle === cy.value
                  ? cy.color + "18"
                  : "var(--bg-secondary)",
              color:
                selectedCycle === cy.value ? cy.color : "var(--text-secondary)",
              fontWeight: selectedCycle === cy.value ? 700 : 400,
              cursor: "pointer",
              fontSize: 14,
              transition: "all .2s",
            }}
          >
            {cy.label}
          </button>
        ))}
      </div>

      {selectedCycle && (
        <>
          <p className="form-label" style={{ marginBottom: 10 }}>
            2. Choisissez la classe&nbsp;
            <span
              style={{
                fontWeight: 400,
                color: "var(--text-muted)",
                marginLeft: 6,
              }}
            >
              🟢 places dispo · 🔴 complet
            </span>
          </p>
          {classesByCycle.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                padding: 20,
                color: "var(--text-muted)",
                fontSize: 13,
              }}
            >
              Aucune classe pour ce niveau.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))",
                gap: 10,
              }}
            >
              {classesByCycle.map((cls) => {
                const left = spotsLeft(cls, students);
                const full = left !== "∞" && left <= 0;
                const chosen = String(studentForm.classId) === String(cls.id);
                const name =
                  cls.name ?? `${cls.gradeNumber ?? ""}${cls.division ?? ""}`;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    disabled={full}
                    onClick={() => SF("classId", cls.id)}
                    style={{
                      padding: "14px 10px",
                      borderRadius: 12,
                      textAlign: "center",
                      border: "2px solid",
                      borderColor: chosen
                        ? "var(--primary)"
                        : full
                          ? "#ef4444"
                          : "#10b981",
                      background: chosen
                        ? "var(--primary)1a"
                        : full
                          ? "rgba(239,68,68,.06)"
                          : "rgba(16,185,129,.06)",
                      cursor: full ? "not-allowed" : "pointer",
                      opacity: full ? 0.5 : 1,
                      transition: "all .2s",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: chosen
                          ? "var(--primary)"
                          : "var(--text-primary)",
                        marginBottom: 4,
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: full ? "#ef4444" : "#10b981",
                      }}
                    >
                      {full
                        ? "🔴 Complet"
                        : `🟢 ${left} place${left > 1 ? "s" : ""}`}
                    </div>
                    {cls.maxCapacity && (
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        Capacité : {cls.maxCapacity}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {!selectedCycle && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          👆 Sélectionnez un niveau pour voir les classes disponibles
        </div>
      )}

      {selectedClass && (
        <div
          style={{
            marginTop: 16,
            padding: "10px 14px",
            borderRadius: 8,
            background: "rgba(99,102,241,.08)",
            border: "1px solid var(--primary)",
            fontSize: 13,
            color: "var(--primary)",
            display: "flex",
            gap: 6,
          }}
        >
          <span>✅</span>
          <span>
            Classe sélectionnée :{" "}
            <b>
              {selectedClass.name ??
                `${selectedClass.gradeNumber}${selectedClass.division ?? ""}`}
            </b>{" "}
            — {selectedClass.cycle} — {spotsLeft(selectedClass, students)}{" "}
            place(s) restante(s)
          </span>
        </div>
      )}
    </div>
  );

  // ── Étape 3 — Parent ──────────────────────────────────────────────────────
  const PF = (key, val) => setParentForm((p) => ({ ...p, [key]: val }));

  const StepParent = (
    <div className="form-grid">
      <p
        style={{
          gridColumn: "1/-1",
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 4,
        }}
      >
        Optionnel — vous pouvez ajouter le parent plus tard depuis le profil de
        l'élève.
      </p>
      {[
        { label: "Prénom", key: "firstName", placeholder: "Pierre" },
        { label: "Nom", key: "lastName", placeholder: "Mbonimpa" },
        {
          label: "Email",
          key: "email",
          placeholder: "pierre@email.com",
          type: "email",
        },
        {
          label: "Téléphone mobile",
          key: "phoneMobile",
          placeholder: "+25712345678",
        },
        { label: "Profession", key: "profession", placeholder: "Médecin" },
      ].map(({ label, key, placeholder, type = "text" }) => (
        <div className="form-group" key={key}>
          <label className="form-label">{label}</label>
          <input
            className="form-input"
            type={type}
            value={parentForm[key]}
            onChange={(e) => PF(key, e.target.value)}
            placeholder={placeholder}
          />
        </div>
      ))}
      <div className="form-group">
        <label className="form-label">Lien de parenté</label>
        <select
          className="form-select"
          value={parentForm.relationship}
          onChange={(e) => PF("relationship", e.target.value)}
        >
          <option value="">-- Choisir --</option>
          <option value="father">Père</option>
          <option value="mother">Mère</option>
          <option value="guardian">Tuteur légal</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <div className="form-group" style={{ gridColumn: "1/-1" }}>
        <label className="form-label">Adresse</label>
        <input
          className="form-input"
          value={parentForm.address}
          onChange={(e) => PF("address", e.target.value)}
          placeholder="Bujumbura"
        />
      </div>
      <div
        className="form-group"
        style={{
          gridColumn: "1/-1",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <input
          type="checkbox"
          id="emergency"
          checked={parentForm.isEmergencyContact}
          onChange={(e) => PF("isEmergencyContact", e.target.checked)}
        />
        <label htmlFor="emergency" style={{ fontSize: 13, cursor: "pointer" }}>
          🚨 Contact d'urgence
        </label>
      </div>
    </div>
  );

  // ── Étape 4 — Récapitulatif ───────────────────────────────────────────────
  const R = ({ label, value }) =>
    value ? (
      <div style={{ display: "flex", gap: 8, fontSize: 13, padding: "3px 0" }}>
        <span style={{ color: "var(--text-muted)", minWidth: 130 }}>
          {label}
        </span>
        <span style={{ fontWeight: 600 }}>{value}</span>
      </div>
    ) : null;

  const StepRecap = (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          background: "var(--bg-secondary)",
          borderRadius: 10,
          padding: "14px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt=""
            />
          ) : (
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#6366f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {(studentForm.firstName[0] ?? "") +
                (studentForm.lastName[0] ?? "")}
            </div>
          )}
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>
              {studentForm.firstName} {studentForm.lastName}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {studentForm.studentCode || "— code non défini"}
            </div>
          </div>
        </div>
        <R label="Date de naissance" value={studentForm.dateOfBirth} />
        <R label="Lieu de naissance" value={studentForm.placeOfBirth} />
        <R
          label="Genre"
          value={studentForm.gender === "M" ? "Masculin" : "Féminin"}
        />
        <R label="Nationalité" value={studentForm.nationality} />
        <R label="Adresse" value={studentForm.address} />
        <R
          label="Classe"
          value={
            selectedClass
              ? (selectedClass.name ??
                `${selectedClass.gradeNumber}${selectedClass.division ?? ""}`)
              : null
          }
        />
        <R label="Statut" value={studentForm.status} />
      </div>
      {parentForm.firstName && (
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            👨‍👩‍👧 Parent / Tuteur
          </div>
          <R
            label="Nom"
            value={`${parentForm.firstName} ${parentForm.lastName}`}
          />
          <R label="Email" value={parentForm.email} />
          <R label="Téléphone" value={parentForm.phoneMobile} />
          <R label="Lien" value={parentForm.relationship} />
        </div>
      )}
    </div>
  );

  const stepContent = [StepPersonal, StepClass, StepParent, StepRecap];

  const canProceed = () => {
    if (step === 0)
      return (
        studentForm.firstName.trim() &&
        studentForm.lastName.trim() &&
        studentForm.dateOfBirth
      );
    if (step === 1) return !!studentForm.classId;
    return true;
  };

  const modalFooter = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        gap: 8,
      }}
    >
      <button
        className="btn btn-secondary"
        onClick={() => (step > 0 ? setStep((s) => s - 1) : closeModal())}
      >
        {step > 0 ? "‹ Retour" : "Annuler"}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {!editTarget &&
          STEPS.map((_, i) => (
            <span
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                transition: "background .3s",
                background:
                  i === step
                    ? "var(--primary)"
                    : i < step
                      ? "var(--success)"
                      : "var(--border)",
              }}
            />
          ))}
        {!editTarget && step < STEPS.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            style={{ opacity: canProceed() ? 1 : 0.5 }}
          >
            Suivant ›
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "⏳ Enregistrement..."
              : editTarget
                ? "💾 Enregistrer"
                : "✅ Créer l'élève"}
          </button>
        )}
      </div>
    </div>
  );

  // ─── Rendu ────────────────────────────────────────────────────────────────
  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid">
        {[
          { title: "Total Élèves", icon: "👨‍🎓", value: total },
          {
            title: "Actifs",
            icon: "✓",
            value: actifs,
            cls: "success",
            iconStyle: { background: "rgba(16,185,129,.1)", color: "#10b981" },
          },
          {
            title: "Inactifs",
            icon: "⏸",
            value: total - actifs,
            cls: "warning",
            iconStyle: { background: "rgba(245,158,11,.1)", color: "#f59e0b" },
          },
          {
            title: "Classes",
            icon: "🏫",
            value: classes.length,
            cls: "danger",
            iconStyle: { background: "rgba(239,68,68,.1)", color: "#ef4444" },
          },
        ].map(({ title, icon, value, cls = "", iconStyle = {} }) => (
          <div key={title} className={`stat-card ${cls}`}>
            <div className="stat-header">
              <span className="stat-title">{title}</span>
              <span className="stat-icon" style={iconStyle}>
                {icon}
              </span>
            </div>
            <div className="stat-value">{loading ? "…" : value}</div>
          </div>
        ))}
      </div>

      {/* Tableau */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Liste des Élèves</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              className="form-input"
              placeholder="🔍 Nom ou code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <select
              className="form-select"
              style={{ width: "auto" }}
              value={classFilter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Toutes les classes</option>
              {classes.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name ?? `${c.gradeNumber ?? ""}${c.division ?? ""}`}
                </option>
              ))}
            </select>
            <button
              className="btn btn-secondary btn-sm"
              onClick={fetchAll}
              title="Actualiser"
            >
              🔄
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast("Export généré", "success")}
            >
              📤 Exporter
            </button>
            <button className="btn btn-primary btn-sm" onClick={openAdd}>
              ➕ Nouvel Élève
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
              ⏳ Chargement...
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: "var(--text-muted)",
              }}
            >
              Aucun élève trouvé.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Élève</th>
                  <th>Code</th>
                  <th>Niveau</th>
                  <th>Classe</th>
                  <th>Genre</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const cls = classes.find((c) => c.id === Number(s.classId));
                  const clsName = cls
                    ? (cls.name ??
                      `${cls.gradeNumber ?? ""}${cls.division ?? ""}`)
                    : "—";
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
                          {/* ✅ Avatar avec buildPhotoUrl */}
                          <StudentAvatar student={s} size={34} />
                          <div>
                            <div style={{ fontWeight: 600 }}>
                              {s.firstName} {s.lastName}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                              }}
                            >
                              {s.email ?? s.phone ?? ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {s.studentCode ?? "—"}
                      </td>
                      <td style={{ textTransform: "capitalize", fontSize: 12 }}>
                        {cls?.cycle ?? "—"}
                      </td>
                      <td>{clsName}</td>
                      <td>{s.gender === "F" ? "♀ Féminin" : "♂ Masculin"}</td>
                      <td>
                        <span
                          className={`badge ${s.status === "active" ? "badge-success" : s.status === "suspended" ? "badge-danger" : "badge-warning"}`}
                        >
                          {s.status === "active"
                            ? "Actif"
                            : s.status === "suspended"
                              ? "Suspendu"
                              : "Inactif"}
                        </span>
                      </td>
                      <td>
                        <div className="action-menu">
                          {/* ✅ Bouton œil → ouvre le profil détaillé */}
                          <div
                            className="action-btn"
                            title="Voir le profil"
                            onClick={() => setProfileTarget(s)}
                          >
                            👁️
                          </div>
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
                            onClick={() => setDelTarget(s)}
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 14,
            paddingTop: 12,
            borderTop: "1px solid var(--border)",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} / {students.length} élève(s)
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-secondary btn-sm">‹ Préc.</button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-secondary btn-sm">Suiv. ›</button>
          </div>
        </div>
      </div>

      {/* Modal Ajout / Édition */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          editTarget
            ? `✏️ Modifier — ${editTarget.firstName} ${editTarget.lastName}`
            : `➕ Nouvel Élève — ${STEPS[step]}`
        }
        footer={modalFooter}
      >
        {editTarget ? StepPersonal : stepContent[step]}
      </Modal>

      {/* ✅ Modal Profil Détaillé */}
      {profileTarget && (
        <StudentProfileModal
          student={profileTarget}
          classes={classes}
          onClose={() => setProfileTarget(null)}
        />
      )}

      {/* Confirmation suppression */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDelTarget(null)}
        onConfirm={handleDelete}
        target={`l'élève ${deleteTarget?.firstName ?? ""} ${deleteTarget?.lastName ?? ""}`}
      />
    </div>
  );
}
