'use strict';
module.exports = (sequelize, DataTypes) => {
  const InfirmaryVisit = sequelize.define('InfirmaryVisit', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:      { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    visitDate:      { type: DataTypes.DATEONLY, allowNull: false },
    arrivalTime:    { type: DataTypes.TIME, allowNull: false },
    departureTime:  { type: DataTypes.TIME },
    reason:         { type: DataTypes.STRING(300), allowNull: false },
    temperature:    { type: DataTypes.DECIMAL(4,1) },
    bloodPressure:  { type: DataTypes.STRING(20) },
    symptoms:       { type: DataTypes.TEXT },
    treatmentGiven: { type: DataTypes.TEXT },
    decision:       { type: DataTypes.ENUM('returned_to_class','sent_home','observation','samu_called','parent_called'), allowNull: false, defaultValue: 'returned_to_class' },
    parentNotified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    observations:   { type: DataTypes.TEXT },
    recordedBy:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  }, { tableName: 'infirmary_visits', underscored: true, timestamps: true });

  InfirmaryVisit.associate = (db) => {
    InfirmaryVisit.belongsTo(db.Student, { foreignKey: 'studentId',  as: 'student' });
    InfirmaryVisit.belongsTo(db.User,    { foreignKey: 'recordedBy', as: 'recorder' });
  };
  return InfirmaryVisit;
};
