'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeacherClass = sequelize.define('TeacherClass', {
    teacherId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true },
    classId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true },
    isPrimary: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, { tableName: 'teacher_classes', underscored: true, timestamps: false });
  return TeacherClass;
};
