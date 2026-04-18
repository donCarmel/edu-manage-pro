'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id:          { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    classId:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    scheduleId:  { type: DataTypes.INTEGER.UNSIGNED },
    attendDate:  { type: DataTypes.DATEONLY, allowNull: false },
    period:      { type: DataTypes.TINYINT.UNSIGNED },
    status:      { type: DataTypes.ENUM('present','absent','late','excused'), allowNull: false, defaultValue: 'present' },
    lateMinutes: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 0 },
    reason:      { type: DataTypes.STRING(300) },
    justified:   { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    recordedBy:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    recordedAt:  { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  }, { tableName: 'attendance', underscored: true, timestamps: true, createdAt: 'recorded_at', updatedAt: 'updated_at' });

  Attendance.associate = (db) => {
    Attendance.belongsTo(db.Student,  { foreignKey: 'studentId',  as: 'student' });
    Attendance.belongsTo(db.Class,    { foreignKey: 'classId',    as: 'class' });
    Attendance.belongsTo(db.Schedule, { foreignKey: 'scheduleId', as: 'schedule' });
    Attendance.belongsTo(db.User,     { foreignKey: 'recordedBy', as: 'recorder' });
  };
  return Attendance;
};
