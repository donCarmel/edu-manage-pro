'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('canteen_subscriptions', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:       { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'RESTRICT' },
      formula:          { type: Sequelize.ENUM('5j','3j','ticket'), allowNull: false, defaultValue: '5j' },
      monthly_fee:      { type: Sequelize.DECIMAL(8,2), allowNull: false, defaultValue: 0 },
      diet_type:        { type: Sequelize.ENUM('standard','sans_porc','vegetarien','sans_gluten','autre'), allowNull: false, defaultValue: 'standard' },
      start_date:       { type: Sequelize.DATEONLY, allowNull: false },
      end_date:         { type: Sequelize.DATEONLY },
      status:           { type: Sequelize.ENUM('active','suspended','cancelled'), allowNull: false, defaultValue: 'active' },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('canteen_subscriptions', ['student_id'], { name: 'idx_cs_sub_student' });
    await qi.addIndex('canteen_subscriptions', ['status'],     { name: 'idx_cs_sub_status' });
  },
  down: async (qi) => { await qi.dropTable('canteen_subscriptions'); },
};