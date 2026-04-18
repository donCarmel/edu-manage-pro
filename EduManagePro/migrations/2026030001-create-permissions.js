
'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('permissions', {
      id:          { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      module:      { type: Sequelize.STRING(60), allowNull: false },
      action:      { type: Sequelize.STRING(30), allowNull: false },
      description: { type: Sequelize.STRING(200) },
    });
    await qi.addIndex('permissions', ['module', 'action'], { unique: true, name: 'uq_module_action' });
  },
  down: async (qi) => { await qi.dropTable('permissions'); },
};

