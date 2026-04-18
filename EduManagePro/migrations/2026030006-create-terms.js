'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('terms', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'CASCADE' },
      label:            { type: Sequelize.STRING(50), allowNull: false },
      start_date:       { type: Sequelize.DATEONLY, allowNull: false },
      end_date:         { type: Sequelize.DATEONLY, allowNull: false },
      report_date:      { type: Sequelize.DATEONLY },
      term_order:       { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('terms', ['academic_year_id'], { name: 'idx_terms_ay' });
  },
  down: async (qi) => { await qi.dropTable('terms'); },
};
