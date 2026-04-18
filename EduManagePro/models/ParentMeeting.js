'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParentMeeting = sequelize.define('ParentMeeting', {
    id:          { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    parentId:    { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    teacherId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    meetingDate: { type: DataTypes.DATEONLY, allowNull: false },
    meetingTime: { type: DataTypes.TIME, allowNull: false },
    durationMin: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 20 },
    location:    { type: DataTypes.STRING(100) },
    reason:      { type: DataTypes.STRING(300), allowNull: false },
    status:      { type: DataTypes.ENUM('pending','confirmed','done','cancelled'), allowNull: false, defaultValue: 'pending' },
    notes:       { type: DataTypes.TEXT },
    createdBy:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  }, { tableName: 'parent_meetings', underscored: true, timestamps: true });

  ParentMeeting.associate = (db) => {
    ParentMeeting.belongsTo(db.Parent,  { foreignKey: 'parentId',  as: 'parent' });
    ParentMeeting.belongsTo(db.User,    { foreignKey: 'teacherId', as: 'teacher' });
    ParentMeeting.belongsTo(db.Student, { foreignKey: 'studentId', as: 'student' });
    ParentMeeting.belongsTo(db.User,    { foreignKey: 'createdBy', as: 'creator' });
  };
  return ParentMeeting;
};
