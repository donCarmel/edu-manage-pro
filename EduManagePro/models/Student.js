'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentCode:    { type: DataTypes.STRING(20), allowNull: false, unique: true },
    firstName:      { type: DataTypes.STRING(80), allowNull: false },
    lastName:       { type: DataTypes.STRING(80), allowNull: false },
    gender:         { type: DataTypes.ENUM('M','F','autre'), allowNull: false },
    dateOfBirth:    { type: DataTypes.DATEONLY, allowNull: false },
    placeOfBirth:   { type: DataTypes.STRING(100) },
    nationality:    { type: DataTypes.STRING(60) },
    photoUrl:       { type: DataTypes.STRING(500) },
    address:        { type: DataTypes.TEXT },
    city:           { type: DataTypes.STRING(100) },
    postalCode:     { type: DataTypes.STRING(10) },
    phone:          { type: DataTypes.STRING(20) },
    email:          { type: DataTypes.STRING(180) },
    classId:        { type: DataTypes.INTEGER.UNSIGNED },
    status:         { type: DataTypes.ENUM('active','inactive','transferred','graduated','excluded'), allowNull: false, defaultValue: 'active' },
    scholarshipType:{ type: DataTypes.STRING(60) },
    medicalNotes:   { type: DataTypes.TEXT },
  }, { tableName: 'students', underscored: true, timestamps: true });

  Student.associate = (db) => {
    Student.belongsTo(db.Class,         { foreignKey: 'classId', as: 'class' });
    Student.belongsToMany(db.Parent,    { through: db.StudentParent, foreignKey: 'studentId', as: 'parents' });
    Student.hasMany(db.Enrollment,      { foreignKey: 'studentId',  as: 'enrollments' });
    Student.hasMany(db.Attendance,      { foreignKey: 'studentId',  as: 'attendance' });
    Student.hasMany(db.Grade,           { foreignKey: 'studentId',  as: 'grades' });
    Student.hasMany(db.ReportCard,      { foreignKey: 'studentId',  as: 'reportCards' });
    Student.hasOne(db.HealthRecord,     { foreignKey: 'studentId',  as: 'healthRecord' });
    Student.hasMany(db.InfirmaryVisit,  { foreignKey: 'studentId',  as: 'infirmaryVisits' });
    Student.hasMany(db.FeePayment,      { foreignKey: 'studentId',  as: 'feePayments' });
    Student.hasMany(db.CanteenSubscription, { foreignKey: 'studentId', as: 'canteenSubscriptions' });
    Student.hasMany(db.ClubMember,      { foreignKey: 'studentId',  as: 'clubMemberships' });
    Student.hasMany(db.BookLoan,        { foreignKey: 'studentId',  as: 'bookLoans' });
    Student.hasMany(db.CouncilDecision, { foreignKey: 'studentId',  as: 'councilDecisions' });
    Student.hasMany(db.ParentMeeting,   { foreignKey: 'studentId',  as: 'parentMeetings' });
  };
  return Student;
};
