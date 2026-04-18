
'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('role_permissions', {
      role_id:       { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, references: { model: 'roles', key: 'id' }, onDelete: 'CASCADE' },
      permission_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, references: { model: 'permissions', key: 'id' }, onDelete: 'CASCADE' },
    });
  },
  down: async (qi) => { await qi.dropTable('role_permissions'); },
};

