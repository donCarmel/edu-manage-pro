'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('assets', {
      id:                   { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      designation:          { type: Sequelize.STRING(200), allowNull: false },
      category:             { type: Sequelize.STRING(60),  allowNull: false },
      acquisition_date:     { type: Sequelize.DATEONLY },
      acquisition_cost:     { type: Sequelize.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
      current_value:        { type: Sequelize.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
      annual_depreciation:  { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      location:             { type: Sequelize.STRING(100) },
      serial_number:        { type: Sequelize.STRING(100) },
      status:               { type: Sequelize.ENUM('bon_etat','a_renouveler','hors_service','neuf'), allowNull: false, defaultValue: 'bon_etat' },
      notes:                { type: Sequelize.TEXT },
      created_at:           { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:           { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('assets', ['category'], { name: 'idx_assets_category' });
    await qi.addIndex('assets', ['status'],   { name: 'idx_assets_status' });
  },
  down: async (qi) => { await qi.dropTable('assets'); },
};