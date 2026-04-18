'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('students', {
      id:              { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_code:    { type: Sequelize.STRING(20), allowNull: false, unique: true },
      first_name:      { type: Sequelize.STRING(80), allowNull: false },
      last_name:       { type: Sequelize.STRING(80), allowNull: false },
      gender:          { type: Sequelize.ENUM('M','F','autre'), allowNull: false },
      date_of_birth:   { type: Sequelize.DATEONLY, allowNull: false },
      place_of_birth:  { type: Sequelize.STRING(100) },
      nationality:     { type: Sequelize.STRING(60) },
      photo_url:       { type: Sequelize.STRING(500) },
      address:         { type: Sequelize.TEXT },
      city:            { type: Sequelize.STRING(100) },
      postal_code:     { type: Sequelize.STRING(10) },
      phone:           { type: Sequelize.STRING(20) },
      email:           { type: Sequelize.STRING(180) },
      class_id:        { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'classes', key: 'id' }, onDelete: 'SET NULL' },
      status:          { type: Sequelize.ENUM('active','inactive','transferred','graduated','excluded'), allowNull: false, defaultValue: 'active' },
      scholarship_type:{ type: Sequelize.STRING(60) },
      medical_notes:   { type: Sequelize.TEXT },
      created_at:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('students', ['class_id'],             { name: 'idx_students_class' });
    await qi.addIndex('students', ['status'],               { name: 'idx_students_status' });
    await qi.addIndex('students', ['last_name','first_name'],{ name: 'idx_students_name' });
  },
  down: async (qi) => { await qi.dropTable('students'); },
};