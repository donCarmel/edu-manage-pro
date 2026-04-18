'use strict';
const jwt         = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse');

const auth = (req, res, next) => {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return ApiResponse.unauthorized(res, 'Token manquant');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return ApiResponse.unauthorized(res, 'Token invalide ou expiré');
  }
};

const permit = (...roles) => (req, res, next) => {
  if (!req.user) return ApiResponse.unauthorized(res);
  if (!roles.includes(req.user.role)) return ApiResponse.forbidden(res);
  next();
};

module.exports = { auth, permit };
