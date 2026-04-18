'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('academic_years', {
      id:         { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      label:      { type: Sequelize.STRING(20), allowNull: false, unique: true },
      start_date: { type: Sequelize.DATEONLY, allowNull: false },
      end_date:   { type: Sequelize.DATEONLY, allowNull: false },
      is_current: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('academic_years', ['is_current'], { name: 'idx_ay_current' });
  },
  down: async (qi) => { await qi.dropTable('academic_years'); },
};
