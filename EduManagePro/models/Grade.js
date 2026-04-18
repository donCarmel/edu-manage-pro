'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    id:        { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    examId:    { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    score:     { type: DataTypes.DECIMAL(5,2) },
    isAbsent:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comment:   { type: DataTypes.STRING(500) },
    enteredBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    enteredAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  }, { tableName: 'grades', underscored: true, timestamps: true, updatedAt: 'updated_at', createdAt: 'entered_at' });

  Grade.associate = (db) => {
    Grade.belongsTo(db.Exam,    { foreignKey: 'examId',    as: 'exam' });
    Grade.belongsTo(db.Student, { foreignKey: 'studentId', as: 'student' });
    Grade.belongsTo(db.User,    { foreignKey: 'enteredBy', as: 'enteredByUser' });
  };
  return Grade;
};
