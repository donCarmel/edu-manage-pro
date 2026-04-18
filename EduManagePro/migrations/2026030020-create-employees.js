'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('employees', {
      id:                    { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id:               { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, unique: true, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      employee_code:         { type: Sequelize.STRING(20), allowNull: false, unique: true },
      department:            { type: Sequelize.STRING(80), allowNull: false },
      position:              { type: Sequelize.STRING(100), allowNull: false },
      contract_type:         { type: Sequelize.ENUM('CDI','CDD','vacataire','stage','interim'), allowNull: false, defaultValue: 'CDI' },
      work_type:             { type: Sequelize.ENUM('temps_plein','temps_partiel'), allowNull: false, defaultValue: 'temps_plein' },
      hire_date:             { type: Sequelize.DATEONLY, allowNull: false },
      end_date:              { type: Sequelize.DATEONLY },
      gross_salary:          { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      social_rate:           { type: Sequelize.DECIMAL(5,2),  allowNull: false, defaultValue: 16.70 },
      bank_iban:             { type: Sequelize.STRING(34) },
      address:               { type: Sequelize.TEXT },
      emergency_contact_name:  { type: Sequelize.STRING(160) },
      emergency_contact_phone: { type: Sequelize.STRING(20) },
      status:                { type: Sequelize.ENUM('active','on_leave','terminated','suspended'), allowNull: false, defaultValue: 'active' },
      created_at:            { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:            { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('employees', ['department'], { name: 'idx_emp_dept' });
    await qi.addIndex('employees', ['status'],     { name: 'idx_emp_status' });
  },
  down: async (qi) => { await qi.dropTable('employees'); },
};