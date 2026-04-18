
'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('roles', {
      id:            { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name:          { type: Sequelize.STRING(50),  allowNull: false, unique: true },
      label:         { type: Sequelize.STRING(100), allowNull: false },
      priority_level:{ type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 5 },
      created_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  down: async (qi) => { await qi.dropTable('roles'); },
};

