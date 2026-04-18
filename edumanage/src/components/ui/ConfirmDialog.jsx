export default function ConfirmDialog({ isOpen, onClose, onConfirm, target }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="confirm-dialog">
        <div className="confirm-icon">🗑️</div>
        <div className="confirm-title">Confirmer la suppression</div>
        <div className="confirm-msg">Êtes-vous sûr de vouloir supprimer {target} ? Cette action est irréversible.</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}
