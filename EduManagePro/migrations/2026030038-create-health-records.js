'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('health_records', {
      id:                  { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:          { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, unique: true, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      blood_type:          { type: Sequelize.ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-','inconnu'), defaultValue: 'inconnu' },
      allergies:           { type: Sequelize.TEXT },
      chronic_conditions:  { type: Sequelize.TEXT },
      current_treatments:  { type: Sequelize.TEXT },
      emergency_meds:      { type: Sequelize.TEXT },
      doctor_name:         { type: Sequelize.STRING(160) },
      doctor_phone:        { type: Sequelize.STRING(20) },
      health_insurance:    { type: Sequelize.STRING(100) },
      insurance_number:    { type: Sequelize.STRING(60) },
      last_updated_by:     { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  down: async (qi) => { await qi.dropTable('health_records'); },
};