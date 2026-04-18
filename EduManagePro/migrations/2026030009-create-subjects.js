'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('subjects', {
      id:          { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name:        { type: Sequelize.STRING(100), allowNull: false },
      short_code:  { type: Sequelize.STRING(10),  allowNull: false, unique: true },
      category:    { type: Sequelize.STRING(50) },
      color_hex:   { type: Sequelize.STRING(7), defaultValue: '#3b82f6' },
      coefficient: { type: Sequelize.DECIMAL(4,2), allowNull: false, defaultValue: 1.00 },
      created_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  down: async (qi) => { await qi.dropTable('subjects'); },
};
