'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('evaluations', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      employee_id:      { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'employees', key: 'id' }, onDelete: 'CASCADE' },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'RESTRICT' },
      evaluator_id:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      eval_date:        { type: Sequelize.DATEONLY, allowNull: false },
      score:            { type: Sequelize.DECIMAL(3,1) },
      criteria:         { type: Sequelize.JSON },
      strengths:        { type: Sequelize.TEXT },
      improvements:     { type: Sequelize.TEXT },
      overall_comment:  { type: Sequelize.TEXT },
      status:           { type: Sequelize.ENUM('draft','signed','archived'), allowNull: false, defaultValue: 'draft' },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('evaluations', ['employee_id','academic_year_id'], { unique: true, name: 'uq_eval' });
  },
  down: async (qi) => { await qi.dropTable('evaluations'); },
};