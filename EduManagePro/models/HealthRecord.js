'use strict';
module.exports = (sequelize, DataTypes) => {
  const HealthRecord = sequelize.define('HealthRecord', {
    id:               { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:        { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
    bloodType:        { type: DataTypes.ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-','inconnu'), defaultValue: 'inconnu' },
    allergies:        { type: DataTypes.TEXT },
    chronicConditions:{ type: DataTypes.TEXT },
    currentTreatments:{ type: DataTypes.TEXT },
    emergencyMeds:    { type: DataTypes.TEXT },
    doctorName:       { type: DataTypes.STRING(160) },
    doctorPhone:      { type: DataTypes.STRING(20) },
    healthInsurance:  { type: DataTypes.STRING(100) },
    insuranceNumber:  { type: DataTypes.STRING(60) },
    lastUpdatedBy:    { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'health_records', underscored: true, timestamps: true });

  HealthRecord.associate = (db) => {
    HealthRecord.belongsTo(db.Student, { foreignKey: 'studentId',    as: 'student' });
    HealthRecord.belongsTo(db.User,    { foreignKey: 'lastUpdatedBy', as: 'updatedByUser' });
  };
  return HealthRecord;
};
