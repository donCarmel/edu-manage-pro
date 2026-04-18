'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('fees', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'CASCADE' },
      label:            { type: Sequelize.STRING(120), allowNull: false },
      level:            { type: Sequelize.STRING(30) },
      amount:           { type: Sequelize.DECIMAL(10,2), allowNull: false },
      due_date:         { type: Sequelize.DATEONLY },
      is_mandatory:     { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      description:      { type: Sequelize.TEXT },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('fees', ['academic_year_id'], { name: 'idx_fees_ay' });
  },
  down: async (qi) => { await qi.dropTable('fees'); },
};