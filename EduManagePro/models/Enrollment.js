'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id:                 { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:          { type: DataTypes.INTEGER.UNSIGNED },
    academicYearId:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    classId:            { type: DataTypes.INTEGER.UNSIGNED },
    enrollmentType:     { type: DataTypes.ENUM('nouvelle','reinscription','transfert_entrant'), allowNull: false, defaultValue: 'nouvelle' },
    status:             { type: DataTypes.ENUM('pending','validated','incomplete','refused'), allowNull: false, defaultValue: 'pending' },
    submittedAt:        { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    validatedAt:        { type: DataTypes.DATE },
    validatedBy:        { type: DataTypes.INTEGER.UNSIGNED },
    applicantFirstName: { type: DataTypes.STRING(80) },
    applicantLastName:  { type: DataTypes.STRING(80) },
    applicantDob:       { type: DataTypes.DATEONLY },
    requestedLevel:     { type: DataTypes.STRING(30) },
    parentName:         { type: DataTypes.STRING(160) },
    parentPhone:        { type: DataTypes.STRING(20) },
    parentEmail:        { type: DataTypes.STRING(180) },
    notes:              { type: DataTypes.TEXT },
  }, { tableName: 'enrollments', underscored: true, timestamps: true });

  Enrollment.associate = (db) => {
    Enrollment.belongsTo(db.Student,      { foreignKey: 'studentId',       as: 'student' });
    Enrollment.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId',  as: 'academicYear' });
    Enrollment.belongsTo(db.Class,        { foreignKey: 'classId',         as: 'class' });
    Enrollment.belongsTo(db.User,         { foreignKey: 'validatedBy',     as: 'validator' });
  };
  return Enrollment;
};
