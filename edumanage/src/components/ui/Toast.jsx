export default function Toast({ toast }) {
  if (!toast) return null;
  const icons = { success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className={`toast ${toast.type}`}>
      <span>{icons[toast.type] || icons.info}</span>
      <span className="toast-msg">{toast.message}</span>
    </div>
  );
}
