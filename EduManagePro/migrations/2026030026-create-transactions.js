'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('transactions', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'RESTRICT' },
      type:             { type: Sequelize.ENUM('income','expense'), allowNull: false },
      category:         { type: Sequelize.STRING(80), allowNull: false },
      description:      { type: Sequelize.STRING(300) },
      amount:           { type: Sequelize.DECIMAL(12,2), allowNull: false },
      transaction_date: { type: Sequelize.DATEONLY, allowNull: false },
      reference:        { type: Sequelize.STRING(100) },
      payment_method:   { type: Sequelize.ENUM('virement','cheque','especes','carte','prelevement'), defaultValue: 'virement' },
      status:           { type: Sequelize.ENUM('pending','paid','cancelled','refunded'), allowNull: false, defaultValue: 'paid' },
      student_id:       { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'students',  key: 'id' }, onDelete: 'SET NULL' },
      employee_id:      { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'employees', key: 'id' }, onDelete: 'SET NULL' },
      recorded_by:      { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      attachment_url:   { type: Sequelize.STRING(500) },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('transactions', ['transaction_date'], { name: 'idx_txn_date' });
    await qi.addIndex('transactions', ['type'],             { name: 'idx_txn_type' });
    await qi.addIndex('transactions', ['student_id'],       { name: 'idx_txn_student' });
  },
  down: async (qi) => { await qi.dropTable('transactions'); },
};