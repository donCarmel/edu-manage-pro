'use strict';
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { User, Role } = require('../models');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({
      where: { email, status: 'active' },
      include: [{ model: Role, as: 'role', attributes: ['name', 'label'] }],
    });
    if (!user) throw Object.assign(new Error('Email ou mot de passe incorrect'), { statusCode: 401 });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw Object.assign(new Error('Email ou mot de passe incorrect'), { statusCode: 401 });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.name, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    await user.update({ lastLoginAt: new Date(), lastLoginIp: null });

    return {
      token,
      user: {
        id: user.id, firstName: user.firstName, lastName: user.lastName,
        email: user.email, role: user.role.name, roleLabel: user.role.label,
        avatarUrl: user.avatarUrl, status: user.status,
      },
    };
  }

  async me(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash', 'twoFactorSecret'] },
      include: [{ model: Role, as: 'role' }],
    });
    if (!user) throw Object.assign(new Error('Utilisateur introuvable'), { statusCode: 404 });
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) throw Object.assign(new Error('Introuvable'), { statusCode: 404 });
    const valid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!valid) throw Object.assign(new Error('Ancien mot de passe incorrect'), { statusCode: 400 });
    const hash = await bcrypt.hash(newPassword, 12);
    await user.update({ passwordHash: hash, passwordChangedAt: new Date() });
    return true;
  }
}

module.exports = new AuthService();
