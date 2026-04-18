'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('leaves', {
      id:            { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      employee_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'employees', key: 'id' }, onDelete: 'CASCADE' },
      leave_type:    { type: Sequelize.ENUM('conge_annuel','rtt','maladie','maternite','paternite','exceptionnel','sans_solde','formation'), allowNull: false },
      start_date:    { type: Sequelize.DATEONLY, allowNull: false },
      end_date:      { type: Sequelize.DATEONLY, allowNull: false },
      days_count:    { type: Sequelize.DECIMAL(4,1), allowNull: false, defaultValue: 1 },
      reason:        { type: Sequelize.TEXT },
      status:        { type: Sequelize.ENUM('pending','approved','refused','cancelled'), allowNull: false, defaultValue: 'pending' },
      approved_by:   { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      approved_at:   { type: Sequelize.DATE },
      substitute_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'employees', key: 'id' }, onDelete: 'SET NULL' },
      document_url:  { type: Sequelize.STRING(500) },
      created_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('leaves', ['employee_id'],          { name: 'idx_leave_emp' });
    await qi.addIndex('leaves', ['start_date','end_date'],{ name: 'idx_leave_dates' });
    await qi.addIndex('leaves', ['status'],               { name: 'idx_leave_status' });
  },
  down: async (qi) => { await qi.dropTable('leaves'); },
};