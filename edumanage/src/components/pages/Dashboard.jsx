import { useEffect, useRef } from 'react';
import { students, classes } from '../../data/mockData';

function drawLineChart(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const pad = { t: 20, b: 40, l: 45, r: 20 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  const labels = ['Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév'];
  const datasets = [
    { data: [12.5, 13.1, 13.8, 14.2, 14.8, 15.1], color: '#3b82f6' },
    { data: [11.8, 12.4, 13.0, 13.5, 14.1, 14.5], color: '#10b981' },
    { data: [10.2, 10.8, 11.4, 12.0, 12.6, 13.1], color: '#f59e0b' },
    { data: [13.1, 13.5, 13.9, 14.3, 14.6, 14.9], color: '#8b5cf6' },
  ];
  const allVals = datasets.flatMap((d) => d.data);
  const minV = Math.min(...allVals) * 0.9, maxV = Math.max(...allVals) * 1.05;
  const scaleY = (v) => pad.t + cH - ((v - minV) / (maxV - minV)) * cH;
  const scaleX = (i) => pad.l + (i / (labels.length - 1)) * cW;

  ctx.strokeStyle = 'rgba(51,65,85,0.5)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (i / 4) * cH;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Outfit'; ctx.textAlign = 'right';
    ctx.fillText((maxV - (i / 4) * (maxV - minV)).toFixed(1), pad.l - 6, y + 4);
  }
  ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8'; ctx.font = '11px Outfit';
  labels.forEach((l, i) => ctx.fillText(l, scaleX(i), H - 8));

  datasets.forEach((ds) => {
    ctx.beginPath();
    ds.data.forEach((v, i) => i === 0 ? ctx.moveTo(scaleX(i), scaleY(v)) : ctx.lineTo(scaleX(i), scaleY(v)));
    ctx.strokeStyle = ds.color; ctx.lineWidth = 2.5; ctx.stroke();
    ds.data.forEach((v, i) => {
      ctx.beginPath(); ctx.arc(scaleX(i), scaleY(v), 4, 0, Math.PI * 2);
      ctx.fillStyle = ds.color; ctx.fill();
    });
  });
}

function drawPieChart(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2, r = Math.min(W, H) / 2 - 20;
  const data = [320, 318, 312, 304];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  const total = data.reduce((a, b) => a + b, 0);
  let start = -Math.PI / 2;
  data.forEach((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath(); ctx.fillStyle = colors[i]; ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 3; ctx.stroke();
    start += angle;
  });
}

export default function Dashboard({ showToast }) {
  const lineRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    const drawCharts = () => {
      if (lineRef.current) {
        lineRef.current.width = lineRef.current.parentElement.offsetWidth - 44;
        lineRef.current.height = 200;
        drawLineChart(lineRef.current);
      }
      if (pieRef.current) {
        pieRef.current.width = 200;
        pieRef.current.height = 200;
        drawPieChart(pieRef.current);
      }
    };
    drawCharts();
    window.addEventListener('resize', drawCharts);
    return () => window.removeEventListener('resize', drawCharts);
  }, []);

  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Élèves</span>
            <span className="stat-icon">👨‍🎓</span>
          </div>
          <div className="stat-value">1 254</div>
          <div className="stat-change positive">↑ 3.2% cette année</div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <span className="stat-title">Enseignants</span>
            <span className="stat-icon" style={{ background: 'rgba(16,185,129,.1)', color: '#10b981' }}>👨‍🏫</span>
          </div>
          <div className="stat-value">68</div>
          <div className="stat-change positive">↑ 2 nouveaux</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <span className="stat-title">Moyenne Générale</span>
            <span className="stat-icon" style={{ background: 'rgba(245,158,11,.1)', color: '#f59e0b' }}>📊</span>
          </div>
          <div className="stat-value">14.8/20</div>
          <div className="stat-change positive">↑ 0.4 pts</div>
        </div>
        <div className="stat-card danger">
          <div className="stat-header">
            <span className="stat-title">Absences Aujourd'hui</span>
            <span className="stat-icon" style={{ background: 'rgba(239,68,68,.1)', color: '#ef4444' }}>⚠️</span>
          </div>
          <div className="stat-value">43</div>
          <div className="stat-change negative">↑ 5 vs hier</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-header">
            <span className="stat-title">Taux de Présence</span>
            <span className="stat-icon" style={{ background: 'rgba(139,92,246,.1)', color: '#8b5cf6' }}>✅</span>
          </div>
          <div className="stat-value">96.8%</div>
          <div className="stat-change positive">↑ 0.2%</div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <span className="stat-title">Budget Mensuel</span>
            <span className="stat-icon" style={{ background: 'rgba(16,185,129,.1)', color: '#10b981' }}>💰</span>
          </div>
          <div className="stat-value">€ 487k</div>
          <div className="stat-change positive">↑ 8.2%</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">📈 Performance par Classe</h3>
          </div>
          <canvas ref={lineRef} style={{ display: 'block' }} />
          <div className="chart-legend">
            {[['#3b82f6','5A'],['#10b981','6B'],['#f59e0b','4C'],['#8b5cf6','3A']].map(([c,l]) => (
              <div className="legend-item" key={l}>
                <div className="legend-dot" style={{ background: c }} />
                <span style={{ color: 'var(--text-muted)' }}>Classe {l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">🎓 Répartition Niveaux</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={pieRef} />
          </div>
          <div className="chart-legend" style={{ justifyContent: 'center' }}>
            {[['#3b82f6','6ème (320)'],['#10b981','5ème (318)'],['#f59e0b','4ème (312)'],['#8b5cf6','3ème (304)']].map(([c,l]) => (
              <div className="legend-item" key={l}>
                <div className="legend-dot" style={{ background: c }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Students */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">👨‍🎓 Élèves Récents</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {students.slice(0, 4).map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="avatar" style={{ background: s.color }}>{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Classe {s.class} · Moy. {s.avg}</div>
                </div>
                <span className={`badge ${s.avg >= 14 ? 'badge-success' : s.avg >= 10 ? 'badge-warning' : 'badge-danger'}`}>
                  {s.avg}/20
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Today */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">📅 Programme du Jour</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { time: '08h00 – 09h00', title: 'Mathématiques — 5A', info: 'Prof. Martin · Salle 201', color: '#3b82f6' },
              { time: '09h00 – 10h00', title: 'Anglais — 5A', info: 'Prof. Smith · Salle 115', color: '#10b981' },
              { time: '10h15 – 11h15', title: 'Sciences — 5A', info: 'Prof. Bernard · Labo 2', color: '#f59e0b' },
              { time: '13h30 – 14h30', title: 'Français — 6B', info: 'Prof. Dubois · Salle 102', color: '#8b5cf6' },
            ].map((item, i) => (
              <div key={i} className="schedule-item" style={{ borderLeftColor: item.color }}>
                <div className="schedule-time" style={{ color: item.color }}>{item.time}</div>
                <div className="schedule-title">{item.title}</div>
                <div className="schedule-info">{item.info}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
