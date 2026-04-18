'use strict';
const userService  = require('../services/userService');
const BaseController = require('./BaseController');
const bcrypt = require('bcrypt');

class UserController extends BaseController {
  constructor() {
    super(userService);
    // Binder les méthodes custom
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }
 
  async create(req, res) {
    try {
      const { password, ...rest } = req.body;
 
      // password obligatoire à la création
      if (!password) {
        return res.status(422).json({
          success: false,
          message: 'Données invalides',
          errors:  [{ field: 'password', message: 'Le mot de passe est obligatoire' }],
        });
      }
 
      // Hasher le mot de passe
      const passwordHash = await bcrypt.hash(password, 12);
 
      // Créer l'utilisateur avec passwordHash (pas password)
      const user = await this.service.create({ ...rest, passwordHash });
 
      return res.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data:    sanitize(user),
      });
    } catch (err) {
      return handleError(res, err);
    }
  }
 
  // ── PUT /users/:id ───────────────────────────────────────────────────────
  async update(req, res) {
    try {
      const { password, ...rest } = req.body;
 
      const updates = { ...rest };
 
      // Si un nouveau mot de passe est fourni → le hasher
      if (password) {
        updates.passwordHash = await bcrypt.hash(password, 12);
      }
 
      const user = await this.service.update(req.params.id, updates);
 
      if (!user) {
        return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
      }
 
      return res.status(200).json({
        success: true,
        message: 'Utilisateur mis à jour',
        data:    sanitize(user),
      });
    } catch (err) {
      return handleError(res, err);
    }
  }
}
 
// ── Ne jamais renvoyer passwordHash au client ────────────────────────────
function sanitize(user) {
  if (!user) return null;
  const u = user.toJSON ? user.toJSON() : { ...user };
  delete u.passwordHash;
  delete u.twoFactorSecret;
  return u;
}
 
// ── Gestion centralisée des erreurs ──────────────────────────────────────
function handleError(res, err) {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(422).json({
      success: false,
      message: 'Données invalides',
      errors:  err.errors?.map(e => ({ field: e.path, message: e.message })) || [],
    });
  }
  console.error('[ERREUR UserController]', err.message);
  return res.status(500).json({ success: false, message: 'Erreur serveur' });
}
 
const ctrl = new UserController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;   // ← version custom avec hash
exports.update = ctrl.update;   // ← version custom avec hash
exports.remove = ctrl.remove;
 