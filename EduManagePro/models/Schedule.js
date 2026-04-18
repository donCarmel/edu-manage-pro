'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    classSubjectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    roomId:         { type: DataTypes.INTEGER.UNSIGNED },
    dayOfWeek:      { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    startTime:      { type: DataTypes.TIME, allowNull: false },
    endTime:        { type: DataTypes.TIME, allowNull: false },
    recurrence:     { type: DataTypes.ENUM('weekly','biweekly','once'), allowNull: false, defaultValue: 'weekly' },
    validFrom:      { type: DataTypes.DATEONLY },
    validUntil:     { type: DataTypes.DATEONLY },
  }, { tableName: 'schedule', underscored: true, timestamps: true });

  Schedule.associate = (db) => {
    Schedule.belongsTo(db.ClassSubject, { foreignKey: 'classSubjectId', as: 'classSubject' });
    Schedule.belongsTo(db.Room,         { foreignKey: 'roomId',         as: 'room' });
    Schedule.hasMany(db.Attendance,     { foreignKey: 'scheduleId',     as: 'attendance' });
  };
  return Schedule;
};
