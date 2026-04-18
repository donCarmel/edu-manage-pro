'use strict';
const authService  = require('../services/authService');
const ApiResponse  = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return ApiResponse.badRequest(res, 'Email et mot de passe requis');
  const data = await authService.login(email, password);
  return ApiResponse.success(res, data, 'Connexion réussie');
});

exports.me = asyncHandler(async (req, res) => {
  const user = await authService.me(req.user.id);
  return ApiResponse.success(res, user);
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return ApiResponse.badRequest(res, 'Les deux mots de passe sont requis');
  if (newPassword.length < 8) return ApiResponse.badRequest(res, 'Le nouveau mot de passe doit avoir au moins 8 caractères');
  await authService.changePassword(req.user.id, oldPassword, newPassword);
  return ApiResponse.success(res, null, 'Mot de passe modifié avec succès');
});

exports.logout = asyncHandler(async (req, res) => {
  // Côté client : supprimer le token. Ici on confirme juste.
  return ApiResponse.success(res, null, 'Déconnexion réussie');
});
