'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentParent = sequelize.define('StudentParent', {
    studentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true },
    parentId:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true },
    isPrimary: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, { tableName: 'student_parents', underscored: true, timestamps: false });
  return StudentParent;
};
