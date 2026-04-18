'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('payroll', {
      id:             { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      employee_id:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'employees', key: 'id' }, onDelete: 'RESTRICT' },
      period_month:   { type: Sequelize.TINYINT.UNSIGNED, allowNull: false },
      period_year:    { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false },
      gross_salary:   { type: Sequelize.DECIMAL(10,2), allowNull: false },
      overtime_hours: { type: Sequelize.DECIMAL(5,2),  allowNull: false, defaultValue: 0 },
      overtime_pay:   { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      bonuses:        { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      deductions:     { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      social_charges: { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      net_salary:     { type: Sequelize.DECIMAL(10,2), allowNull: false },
      payment_date:   { type: Sequelize.DATEONLY },
      payment_method: { type: Sequelize.ENUM('virement','cheque','especes'), defaultValue: 'virement' },
      advance_taken:  { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      status:         { type: Sequelize.ENUM('draft','validated','paid'), allowNull: false, defaultValue: 'draft' },
      generated_by:   { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:     { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:     { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('payroll', ['employee_id','period_month','period_year'], { unique: true, name: 'uq_payroll' });
    await qi.addIndex('payroll', ['period_year','period_month'], { name: 'idx_payroll_period' });
  },
  down: async (qi) => { await qi.dropTable('payroll'); },
};