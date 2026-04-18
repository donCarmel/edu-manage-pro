'use strict';
const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.message);

  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    const errors = err.errors.map(e => ({ field: e.path, message: e.message }));
    return res.status(422).json({ success: false, message: 'Données invalides', errors });
  }
  if (err instanceof ForeignKeyConstraintError) {
    return res.status(409).json({ success: false, message: 'Contrainte de clé étrangère violée' });
  }
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({ success: false, message: 'Erreur base de données', detail: err.message });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ success: false, message: err.message || 'Erreur serveur interne' });
};

module.exports = errorHandler;
