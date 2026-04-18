'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassSubject = sequelize.define('ClassSubject', {
    id:        { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    classId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    subjectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    teacherId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    hoursWeek: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 2 },
  }, { tableName: 'class_subjects', underscored: true, timestamps: false });

  ClassSubject.associate = (db) => {
    ClassSubject.belongsTo(db.Class,   { foreignKey: 'classId',   as: 'class' });
    ClassSubject.belongsTo(db.Subject, { foreignKey: 'subjectId', as: 'subject' });
    ClassSubject.belongsTo(db.User,    { foreignKey: 'teacherId', as: 'teacher' });
    ClassSubject.hasMany(db.Schedule,  { foreignKey: 'classSubjectId', as: 'schedules' });
    ClassSubject.hasMany(db.Exam,      { foreignKey: 'classSubjectId', as: 'exams' });
  };
  return ClassSubject;
};
