'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('enrollments', {
      id:                   { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:           { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'students', key: 'id' }, onDelete: 'SET NULL' },
      academic_year_id:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'RESTRICT' },
      class_id:             { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'classes', key: 'id' }, onDelete: 'SET NULL' },
      enrollment_type:      { type: Sequelize.ENUM('nouvelle','reinscription','transfert_entrant'), allowNull: false, defaultValue: 'nouvelle' },
      status:               { type: Sequelize.ENUM('pending','validated','incomplete','refused'), allowNull: false, defaultValue: 'pending' },
      submitted_at:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      validated_at:         { type: Sequelize.DATE },
      validated_by:         { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      applicant_first_name: { type: Sequelize.STRING(80) },
      applicant_last_name:  { type: Sequelize.STRING(80) },
      applicant_dob:        { type: Sequelize.DATEONLY },
      requested_level:      { type: Sequelize.STRING(30) },
      parent_name:          { type: Sequelize.STRING(160) },
      parent_phone:         { type: Sequelize.STRING(20) },
      parent_email:         { type: Sequelize.STRING(180) },
      notes:                { type: Sequelize.TEXT },
      created_at:           { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:           { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('enrollments', ['status'],           { name: 'idx_enroll_status' });
    await qi.addIndex('enrollments', ['academic_year_id'], { name: 'idx_enroll_ay' });
  },
  down: async (qi) => { await qi.dropTable('enrollments'); },
};