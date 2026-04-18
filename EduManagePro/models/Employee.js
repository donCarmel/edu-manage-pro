'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id:                   { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId:               { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
    employeeCode:         { type: DataTypes.STRING(20), allowNull: false, unique: true },
    department:           { type: DataTypes.STRING(80), allowNull: false },
    position:             { type: DataTypes.STRING(100), allowNull: false },
    contractType:         { type: DataTypes.ENUM('CDI','CDD','vacataire','stage','interim'), allowNull: false, defaultValue: 'CDI' },
    workType:             { type: DataTypes.ENUM('temps_plein','temps_partiel'), allowNull: false, defaultValue: 'temps_plein' },
    hireDate:             { type: DataTypes.DATEONLY, allowNull: false },
    endDate:              { type: DataTypes.DATEONLY },
    grossSalary:          { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0.00 },
    socialRate:           { type: DataTypes.DECIMAL(5,2),  allowNull: false, defaultValue: 16.70 },
    bankIban:             { type: DataTypes.STRING(34) },
    address:              { type: DataTypes.TEXT },
    emergencyContactName: { type: DataTypes.STRING(160) },
    emergencyContactPhone:{ type: DataTypes.STRING(20) },
    status:               { type: DataTypes.ENUM('active','on_leave','terminated','suspended'), allowNull: false, defaultValue: 'active' },
  }, { tableName: 'employees', underscored: true, timestamps: true });

  Employee.associate = (db) => {
    Employee.belongsTo(db.User,        { foreignKey: 'userId', as: 'user' });
    Employee.hasMany(db.Payroll,       { foreignKey: 'employeeId', as: 'payrolls' });
    Employee.hasMany(db.Leave,         { foreignKey: 'employeeId', as: 'leaves' });
    Employee.hasMany(db.Evaluation,    { foreignKey: 'employeeId', as: 'evaluations' });
    Employee.belongsToMany(db.Class,   { through: db.TeacherClass, foreignKey: 'teacherId', as: 'assignedClasses' });
  };
  return Employee;
};
