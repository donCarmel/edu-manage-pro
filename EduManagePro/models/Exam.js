'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    classSubjectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    termId:         { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    roomId:         { type: DataTypes.INTEGER.UNSIGNED },
    title:          { type: DataTypes.STRING(200), allowNull: false },
    examType:       { type: DataTypes.ENUM('controle','examen_final','tp','oral','devoir_maison'), allowNull: false, defaultValue: 'controle' },
    examDate:       { type: DataTypes.DATEONLY, allowNull: false },
    startTime:      { type: DataTypes.TIME },
    durationMin:    { type: DataTypes.SMALLINT.UNSIGNED },
    maxScore:       { type: DataTypes.DECIMAL(5,2), allowNull: false, defaultValue: 20.00 },
    coefficient:    { type: DataTypes.DECIMAL(4,2), allowNull: false, defaultValue: 1.00 },
    supervisorId:   { type: DataTypes.INTEGER.UNSIGNED },
    notes:          { type: DataTypes.TEXT },
  }, { tableName: 'exams', underscored: true, timestamps: true });

  Exam.associate = (db) => {
    Exam.belongsTo(db.ClassSubject, { foreignKey: 'classSubjectId', as: 'classSubject' });
    Exam.belongsTo(db.Term,         { foreignKey: 'termId',         as: 'term' });
    Exam.belongsTo(db.Room,         { foreignKey: 'roomId',         as: 'room' });
    Exam.belongsTo(db.User,         { foreignKey: 'supervisorId',   as: 'supervisor' });
    Exam.hasMany(db.Grade,          { foreignKey: 'examId',         as: 'grades' });
  };
  return Exam;
};
