'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('book_loans', {
      id:            { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      book_id:       { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'books',    key: 'id' }, onDelete: 'RESTRICT' },
      student_id:    { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'students', key: 'id' }, onDelete: 'SET NULL' },
      user_id:       { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users',    key: 'id' }, onDelete: 'SET NULL' },
      loan_date:     { type: Sequelize.DATEONLY, allowNull: false },
      due_date:      { type: Sequelize.DATEONLY, allowNull: false },
      return_date:   { type: Sequelize.DATEONLY },
      status:        { type: Sequelize.ENUM('active','returned','overdue','lost'), allowNull: false, defaultValue: 'active' },
      late_fee:      { type: Sequelize.DECIMAL(6,2), allowNull: false, defaultValue: 0 },
      condition_out: { type: Sequelize.ENUM('neuf','bon','acceptable','abime'), defaultValue: 'bon' },
      condition_in:  { type: Sequelize.ENUM('neuf','bon','acceptable','abime') },
      managed_by:    { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      notes:         { type: Sequelize.STRING(300) },
      created_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('book_loans', ['student_id'], { name: 'idx_loan_student' });
    await qi.addIndex('book_loans', ['status'],     { name: 'idx_loan_status' });
    await qi.addIndex('book_loans', ['due_date'],   { name: 'idx_loan_due' });
  },
  down: async (qi) => { await qi.dropTable('book_loans'); },
};