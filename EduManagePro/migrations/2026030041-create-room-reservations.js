'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('room_reservations', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      room_id:          { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'rooms', key: 'id' }, onDelete: 'CASCADE' },
      requested_by:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      reservation_date: { type: Sequelize.DATEONLY, allowNull: false },
      start_time:       { type: Sequelize.TIME, allowNull: false },
      end_time:         { type: Sequelize.TIME, allowNull: false },
      purpose:          { type: Sequelize.STRING(300), allowNull: false },
      status:           { type: Sequelize.ENUM('pending','confirmed','cancelled','rejected'), allowNull: false, defaultValue: 'pending' },
      approved_by:      { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      approved_at:      { type: Sequelize.DATE },
      notes:            { type: Sequelize.STRING(300) },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('room_reservations', ['reservation_date'], { name: 'idx_rr_date' });
    await qi.addIndex('room_reservations', ['room_id'],          { name: 'idx_rr_room' });
    await qi.addIndex('room_reservations', ['status'],           { name: 'idx_rr_status' });
  },
  down: async (qi) => { await qi.dropTable('room_reservations'); },
};