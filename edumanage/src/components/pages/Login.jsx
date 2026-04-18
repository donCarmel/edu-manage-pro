import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Email ou mot de passe incorrect.');
        return;
      }

      // Stocker le token et les infos user
      localStorage.setItem('token', data.data?.token || data.token);
      localStorage.setItem('user',  JSON.stringify(data.data?.user || data.user));

      onLogin(data.data?.user || data.user);
    } catch (err) {
      setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Fond décoratif */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🎓</div>
          <div>
            <div style={styles.logoText}>EduManage</div>
            <div style={styles.logoSub}>Pro · Système de Gestion Scolaire</div>
          </div>
        </div>

        <h2 style={styles.title}>Connexion</h2>
        <p style={styles.subtitle}>Bienvenue ! Connectez-vous pour accéder à votre espace.</p>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Adresse email</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                placeholder="admin@edumanage.local"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Mot de passe</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: '48px' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                style={styles.eyeBtn}
                tabIndex={-1}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              '🚀  Se connecter'
            )}
          </button>
        </form>

        <p style={styles.footer}>
          EduManage Pro v1.0 &nbsp;·&nbsp; Tous droits réservés
        </p>
      </div>
    </div>
  );
}

/* ── Styles inline (cohérents avec le dark-theme du projet) ── */
const styles = {
  wrapper: {
    minHeight:       '100vh',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    background:      'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    fontFamily:      "'Outfit', sans-serif",
    position:        'relative',
    overflow:        'hidden',
    padding:         '20px',
  },
  blob1: {
    position:     'absolute',
    width:        '500px',
    height:       '500px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(59,130,246,.15) 0%, transparent 70%)',
    top:          '-100px',
    left:         '-100px',
    pointerEvents:'none',
  },
  blob2: {
    position:     'absolute',
    width:        '400px',
    height:       '400px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%)',
    bottom:       '-80px',
    right:        '-80px',
    pointerEvents:'none',
  },
  card: {
    background:   '#1e293b',
    border:       '1px solid #334155',
    borderRadius: '20px',
    padding:      '48px 40px',
    width:        '100%',
    maxWidth:     '440px',
    position:     'relative',
    boxShadow:    '0 25px 60px rgba(0,0,0,.5)',
  },
  logoWrap: {
    display:        'flex',
    alignItems:     'center',
    gap:            '14px',
    marginBottom:   '32px',
  },
  logoIcon: {
    width:          '52px',
    height:         '52px',
    background:     'linear-gradient(135deg, #3b82f6, #6366f1)',
    borderRadius:   '14px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    fontSize:       '26px',
    flexShrink:     0,
  },
  logoText: {
    fontFamily:  "'Space Mono', monospace",
    fontSize:    '22px',
    fontWeight:  '700',
    color:       '#f1f5f9',
  },
  logoSub: {
    fontSize:    '11px',
    color:       '#64748b',
    marginTop:   '2px',
  },
  title: {
    fontSize:     '26px',
    fontWeight:   '700',
    color:        '#f1f5f9',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize:     '14px',
    color:        '#94a3b8',
    marginBottom: '28px',
  },
  errorBox: {
    background:   'rgba(239,68,68,.15)',
    border:       '1px solid rgba(239,68,68,.4)',
    borderRadius: '10px',
    padding:      '12px 16px',
    color:        '#fca5a5',
    fontSize:     '14px',
    marginBottom: '20px',
    display:      'flex',
    gap:          '8px',
    alignItems:   'center',
  },
  form: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '20px',
  },
  fieldGroup: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '8px',
  },
  label: {
    fontSize:   '13px',
    fontWeight: '600',
    color:      '#cbd5e1',
    letterSpacing: '.3px',
  },
  inputWrap: {
    position: 'relative',
    display:  'flex',
    alignItems:'center',
  },
  inputIcon: {
    position:  'absolute',
    left:      '14px',
    fontSize:  '16px',
    pointerEvents: 'none',
  },
  input: {
    width:        '100%',
    padding:      '13px 14px 13px 44px',
    background:   '#0f172a',
    border:       '1px solid #334155',
    borderRadius: '10px',
    color:        '#f1f5f9',
    fontSize:     '15px',
    fontFamily:   "'Outfit', sans-serif",
    outline:      'none',
    transition:   'border-color .2s',
  },
  eyeBtn: {
    position:   'absolute',
    right:      '12px',
    background: 'none',
    border:     'none',
    cursor:     'pointer',
    fontSize:   '18px',
    padding:    '4px',
    lineHeight: 1,
  },
  btn: {
    padding:        '14px',
    background:     'linear-gradient(135deg, #3b82f6, #6366f1)',
    border:         'none',
    borderRadius:   '12px',
    color:          'white',
    fontSize:       '15px',
    fontWeight:     '600',
    fontFamily:     "'Outfit', sans-serif",
    cursor:         'pointer',
    transition:     'transform .15s, box-shadow .15s',
    marginTop:      '4px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '8px',
    boxShadow:      '0 4px 20px rgba(59,130,246,.35)',
  },
  spinner: {
    width:          '20px',
    height:         '20px',
    border:         '3px solid rgba(255,255,255,.3)',
    borderTop:      '3px solid white',
    borderRadius:   '50%',
    display:        'inline-block',
    animation:      'spin 0.8s linear infinite',
  },
  footer: {
    textAlign:  'center',
    fontSize:   '12px',
    color:      '#475569',
    marginTop:  '28px',
  },
};
