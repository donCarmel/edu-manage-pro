'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('transport_routes', {
      id:             { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      route_name:     { type: Sequelize.STRING(100), allowNull: false },
      bus_number:     { type: Sequelize.STRING(20),  allowNull: false },
      driver_name:    { type: Sequelize.STRING(160) },
      driver_phone:   { type: Sequelize.STRING(20) },
      capacity:       { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 40 },
      stops:          { type: Sequelize.JSON, allowNull: false },
      morning_time:   { type: Sequelize.TIME },
      afternoon_time: { type: Sequelize.TIME },
      status:         { type: Sequelize.ENUM('active','inactive','maintenance'), allowNull: false, defaultValue: 'active' },
      created_at:     { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:     { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('transport_routes', ['status'], { name: 'idx_tr_status' });
  },
  down: async (qi) => { await qi.dropTable('transport_routes'); },
};