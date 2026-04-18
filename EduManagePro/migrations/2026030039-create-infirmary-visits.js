'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('infirmary_visits', {
      id:              { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:      { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      visit_date:      { type: Sequelize.DATEONLY, allowNull: false },
      arrival_time:    { type: Sequelize.TIME, allowNull: false },
      departure_time:  { type: Sequelize.TIME },
      reason:          { type: Sequelize.STRING(300), allowNull: false },
      temperature:     { type: Sequelize.DECIMAL(4,1) },
      blood_pressure:  { type: Sequelize.STRING(20) },
      symptoms:        { type: Sequelize.TEXT },
      treatment_given: { type: Sequelize.TEXT },
      decision:        { type: Sequelize.ENUM('returned_to_class','sent_home','observation','samu_called','parent_called'), allowNull: false, defaultValue: 'returned_to_class' },
      parent_notified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      observations:    { type: Sequelize.TEXT },
      recorded_by:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      created_at:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('infirmary_visits', ['student_id'], { name: 'idx_iv_student' });
    await qi.addIndex('infirmary_visits', ['visit_date'], { name: 'idx_iv_date' });
  },
  down: async (qi) => { await qi.dropTable('infirmary_visits'); },
};