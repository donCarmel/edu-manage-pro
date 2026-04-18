
'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('activity_logs', {
      id:          { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id:     { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      action:      { type: Sequelize.STRING(60),  allowNull: false },
      module:      { type: Sequelize.STRING(60),  allowNull: false },
      record_id:   { type: Sequelize.INTEGER.UNSIGNED },
      description: { type: Sequelize.TEXT },
      ip_address:  { type: Sequelize.STRING(45) },
      user_agent:  { type: Sequelize.STRING(500) },
      created_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('activity_logs', ['user_id'],    { name: 'idx_logs_user' });
    await qi.addIndex('activity_logs', ['module'],     { name: 'idx_logs_module' });
    await qi.addIndex('activity_logs', ['created_at'], { name: 'idx_logs_created' });
  },
  down: async (qi) => { await qi.dropTable('activity_logs'); },
};

