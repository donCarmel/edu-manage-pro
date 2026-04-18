
'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('users', {
      id:                  { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      role_id:             { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'roles', key: 'id' }, onDelete: 'RESTRICT' },
      first_name:          { type: Sequelize.STRING(80),  allowNull: false },
      last_name:           { type: Sequelize.STRING(80),  allowNull: false },
      email:               { type: Sequelize.STRING(180), allowNull: false, unique: true },
      password_hash:       { type: Sequelize.STRING(255), allowNull: false },
      phone:               { type: Sequelize.STRING(20) },
      avatar_url:          { type: Sequelize.STRING(500) },
      status:              { type: Sequelize.ENUM('active','inactive','suspended'), allowNull: false, defaultValue: 'active' },
      two_factor_enabled:  { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      two_factor_secret:   { type: Sequelize.STRING(100) },
      last_login_at:       { type: Sequelize.DATE },
      last_login_ip:       { type: Sequelize.STRING(45) },
      password_changed_at: { type: Sequelize.DATE },
      email_verified_at:   { type: Sequelize.DATE },
      created_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('users', ['email'],   { unique: true, name: 'idx_users_email' });
    await qi.addIndex('users', ['role_id'], { name: 'idx_users_role' });
    await qi.addIndex('users', ['status'],  { name: 'idx_users_status' });
  },
  down: async (qi) => { await qi.dropTable('users'); },
};

