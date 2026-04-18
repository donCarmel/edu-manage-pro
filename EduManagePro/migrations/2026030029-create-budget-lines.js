'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('budget_lines', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'CASCADE' },
      category:         { type: Sequelize.STRING(80),  allowNull: false },
      type:             { type: Sequelize.ENUM('income','expense'), allowNull: false },
      label:            { type: Sequelize.STRING(200), allowNull: false },
      planned_amount:   { type: Sequelize.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
      actual_amount:    { type: Sequelize.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
      notes:            { type: Sequelize.TEXT },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('budget_lines', ['academic_year_id'], { name: 'idx_bl_ay' });
  },
  down: async (qi) => { await qi.dropTable('budget_lines'); },
};