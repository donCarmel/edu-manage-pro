'use strict';
module.exports = (sequelize, DataTypes) => {
  const CanteenAttendance = sequelize.define('CanteenAttendance', {
    id:                     { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:              { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    canteenSubscriptionId:  { type: DataTypes.INTEGER.UNSIGNED },
    attendDate:             { type: DataTypes.DATEONLY, allowNull: false },
    status:                 { type: DataTypes.ENUM('present','absent','ticket'), allowNull: false, defaultValue: 'present' },
    recordedBy:             { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'canteen_attendance', underscored: true, timestamps: true, updatedAt: false });

  CanteenAttendance.associate = (db) => {
    CanteenAttendance.belongsTo(db.Student,             { foreignKey: 'studentId',             as: 'student' });
    CanteenAttendance.belongsTo(db.CanteenSubscription, { foreignKey: 'canteenSubscriptionId', as: 'subscription' });
    CanteenAttendance.belongsTo(db.User,                { foreignKey: 'recordedBy',            as: 'recorder' });
  };
  return CanteenAttendance;
};
