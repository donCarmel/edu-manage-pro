'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('fee_payments', {
      id:             { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      fee_id:         { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'fees',     key: 'id' }, onDelete: 'RESTRICT' },
      student_id:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      amount_paid:    { type: Sequelize.DECIMAL(10,2), allowNull: false },
      paid_at:        { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      payment_method: { type: Sequelize.ENUM('virement','cheque','especes','carte'), defaultValue: 'especes' },
      receipt_number: { type: Sequelize.STRING(50) },
      recorded_by:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      notes:          { type: Sequelize.STRING(300) },
    });
    await qi.addIndex('fee_payments', ['student_id'], { name: 'idx_fp_student' });
    await qi.addIndex('fee_payments', ['fee_id'],     { name: 'idx_fp_fee' });
  },
  down: async (qi) => { await qi.dropTable('fee_payments'); },
};