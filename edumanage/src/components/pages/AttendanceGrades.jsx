import { useState } from 'react';
import { attendanceData, gradesData } from '../../data/mockData';

const statusConfig = {
  present: { icon: '✓', color: '#10b981' },
  absent: { icon: '✗', color: '#ef4444' },
  late: { icon: '⚠', color: '#f59e0b' },
};

export function Attendance({ showToast }) {
  const [data, setData] = useState(attendanceData);

  const toggleDay = (studentId, dayIdx) => {
    setData(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const days = [...s.days];
      const cycle = ['present', 'absent', 'late'];
      const cur = cycle.indexOf(days[dayIdx]);
      days[dayIdx] = cycle[(cur + 1) % 3];
      const presentCount = days.filter(d => d === 'present').length;
      const rate = Math.round((presentCount / days.length) * 100);
      return { ...s, days, rate };
    }));
  };

  return (
    <div className="page-enter">
      <div className="stats-grid">
        <div className="stat-card success"><div className="stat-header"><span className="stat-title">Présents Aujourd'hui</span><span className="stat-icon" style={{background:'rgba(16,185,129,.1)',color:'#10b981'}}>✅</span></div><div className="stat-value">1 181</div><div className="stat-change positive">94.2% du total</div></div>
        <div className="stat-card danger"><div className="stat-header"><span className="stat-title">Absents</span><span className="stat-icon" style={{background:'rgba(239,68,68,.1)',color:'#ef4444'}}>❌</span></div><div className="stat-value">43</div></div>
        <div className="stat-card warning"><div className="stat-header"><span className="stat-title">Retards</span><span className="stat-icon" style={{background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>⏰</span></div><div className="stat-value">30</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-title">Taux Mensuel</span><span className="stat-icon">📊</span></div><div className="stat-value">96.8%</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Feuille de Présence</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <input type="date" className="form-input" style={{width:'auto'}} defaultValue="2026-02-28" />
            <select className="form-select" style={{width:'auto'}}><option>Toutes les classes</option><option>5A</option><option>6B</option><option>4C</option><option>3A</option></select>
            <button className="btn btn-success btn-sm" onClick={()=>showToast('Présences enregistrées','success')}>💾 Enregistrer</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Export généré','success')}>📤 Exporter</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Élève</th><th>Classe</th>
                <th>Lundi</th><th>Mardi</th><th>Mercredi</th><th>Jeudi</th><th>Vendredi</th>
                <th>Taux</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div className="avatar" style={{background:s.color}}>{s.initials}</div>
                      {s.name}
                    </div>
                  </td>
                  <td>{s.class}</td>
                  {s.days.map((day, i) => (
                    <td key={i}>
                      <span
                        className="pres-toggle"
                        style={{color: statusConfig[day].color}}
                        onClick={() => toggleDay(s.id, i)}
                        title="Cliquer pour changer"
                      >
                        {statusConfig[day].icon}
                      </span>
                    </td>
                  ))}
                  <td>
                    <span className={`badge ${s.rate === 100 ? 'badge-success' : s.rate >= 80 ? 'badge-warning' : 'badge-danger'}`}>
                      {s.rate}%
                    </span>
                  </td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast(`Historique de ${s.name}`,'success')}>📋</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:12,fontSize:12,color:'var(--text-muted)'}}>
          💡 Cliquez sur ✓ / ✗ / ⚠ pour basculer le statut de présence.
        </div>
      </div>
    </div>
  );
}

export function Grades({ showToast }) {
  const gradeColor = (v) => v >= 14 ? '#10b981' : v >= 10 ? '#3b82f6' : v >= 8 ? '#f59e0b' : '#ef4444';

  return (
    <div className="page-enter">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Notes & Bulletins</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <select className="form-select" style={{width:'auto'}}>
              <option>Trimestre 2 — 2025/2026</option>
              <option>Trimestre 1 — 2025/2026</option>
            </select>
            <button className="btn btn-secondary btn-sm" onClick={()=>showToast('Bulletins en cours de génération...','success')}>📄 Générer Bulletins</button>
            <button className="btn btn-primary btn-sm" onClick={()=>showToast('Saisie de notes ouverte','success')}>➕ Saisir Notes</button>
          </div>
        </div>

        <div className="kpi-row">
          <div className="kpi"><div className="kpi-val" style={{color:'#10b981'}}>14.8</div><div className="kpi-lbl">Moy. Classe</div></div>
          <div className="kpi"><div className="kpi-val" style={{color:'#3b82f6'}}>18.5</div><div className="kpi-lbl">Meilleure Note</div></div>
          <div className="kpi"><div className="kpi-val" style={{color:'#ef4444'}}>8.5</div><div className="kpi-lbl">Note Min.</div></div>
          <div className="kpi"><div className="kpi-val">68%</div><div className="kpi-lbl">≥ 10/20</div></div>
          <div className="kpi"><div className="kpi-val" style={{color:'#f59e0b'}}>22%</div><div className="kpi-lbl">En difficulté</div></div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Élève</th><th>Classe</th><th>Maths</th><th>Français</th>
                <th>Sciences</th><th>Histoire</th><th>Anglais</th>
                <th>Moyenne</th><th>Rang</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div className="avatar" style={{background:s.color}}>{s.initials}</div>
                      {s.name}
                    </div>
                  </td>
                  <td>{s.class}</td>
                  {[s.maths, s.french, s.science, s.history, s.english].map((g, i) => (
                    <td key={i}><span style={{color: gradeColor(g), fontWeight: 600}}>{g}</span></td>
                  ))}
                  <td>
                    <span className={`badge ${s.avg >= 14 ? 'badge-success' : s.avg >= 10 ? 'badge-info' : s.avg >= 8 ? 'badge-warning' : 'badge-danger'}`}>
                      {s.avg}/20
                    </span>
                  </td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{s.rank}</td>
                  <td>
                    <div className="action-menu">
                      <div className="action-btn" onClick={()=>showToast(`Bulletin ${s.name} généré`,'success')}>📄</div>
                      <div className="action-btn" onClick={()=>showToast('Édition notes...','success')}>✏️</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
