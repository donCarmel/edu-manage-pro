'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('book_reservations', {
      id:           { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      book_id:      { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'books',    key: 'id' }, onDelete: 'CASCADE' },
      student_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      reserved_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      expires_at:   { type: Sequelize.DATE },
      status:       { type: Sequelize.ENUM('waiting','ready','fulfilled','cancelled'), allowNull: false, defaultValue: 'waiting' },
      notified_at:  { type: Sequelize.DATE },
    });
    await qi.addIndex('book_reservations', ['status'],  { name: 'idx_res_status' });
    await qi.addIndex('book_reservations', ['book_id'], { name: 'idx_res_book' });
  },
  down: async (qi) => { await qi.dropTable('book_reservations'); },
};