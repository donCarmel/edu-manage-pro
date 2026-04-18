'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('medical_stock', {
      id:            { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name:          { type: Sequelize.STRING(150), allowNull: false },
      category:      { type: Sequelize.STRING(60),  allowNull: false },
      quantity:      { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 0 },
      unit:          { type: Sequelize.STRING(30),  allowNull: false, defaultValue: 'comprimé' },
      expiry_date:   { type: Sequelize.DATEONLY },
      minimum_stock: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 5 },
      location:      { type: Sequelize.STRING(100) },
      updated_by:    { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('medical_stock', ['category'],    { name: 'idx_ms_category' });
    await qi.addIndex('medical_stock', ['expiry_date'], { name: 'idx_ms_expiry' });
  },
  down: async (qi) => { await qi.dropTable('medical_stock'); },
};