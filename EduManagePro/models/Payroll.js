'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payroll = sequelize.define('Payroll', {
    id:            { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    employeeId:    { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    periodMonth:   { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    periodYear:    { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    grossSalary:   { type: DataTypes.DECIMAL(10,2), allowNull: false },
    overtimeHours: { type: DataTypes.DECIMAL(5,2),  allowNull: false, defaultValue: 0 },
    overtimePay:   { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    bonuses:       { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    deductions:    { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    socialCharges: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    netSalary:     { type: DataTypes.DECIMAL(10,2), allowNull: false },
    paymentDate:   { type: DataTypes.DATEONLY },
    paymentMethod: { type: DataTypes.ENUM('virement','cheque','especes'), defaultValue: 'virement' },
    advanceTaken:  { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    status:        { type: DataTypes.ENUM('draft','validated','paid'), allowNull: false, defaultValue: 'draft' },
    generatedBy:   { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'payroll', underscored: true, timestamps: true });

  Payroll.associate = (db) => {
    Payroll.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });
    Payroll.belongsTo(db.User,     { foreignKey: 'generatedBy', as: 'generatedByUser' });
  };
  return Payroll;
};
