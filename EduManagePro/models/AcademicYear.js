'use strict';
module.exports = (sequelize, DataTypes) => {
  const AcademicYear = sequelize.define('AcademicYear', {
    id:        { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    label:     { type: DataTypes.STRING(20), allowNull: false, unique: true },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate:   { type: DataTypes.DATEONLY, allowNull: false },
    isCurrent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, { tableName: 'academic_years', underscored: true, timestamps: true });

  AcademicYear.associate = (db) => {
    AcademicYear.hasMany(db.Term,       { foreignKey: 'academicYearId', as: 'terms' });
    AcademicYear.hasMany(db.Class,      { foreignKey: 'academicYearId', as: 'classes' });
    AcademicYear.hasMany(db.Enrollment, { foreignKey: 'academicYearId', as: 'enrollments' });
  };
  return AcademicYear;
};
