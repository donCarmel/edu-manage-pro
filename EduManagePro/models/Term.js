'use strict';
module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    academicYearId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    label:          { type: DataTypes.STRING(50), allowNull: false },
    startDate:      { type: DataTypes.DATEONLY,   allowNull: false },
    endDate:        { type: DataTypes.DATEONLY,   allowNull: false },
    reportDate:     { type: DataTypes.DATEONLY },
    termOrder:      { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
  }, { tableName: 'terms', underscored: true, timestamps: true });

  Term.associate = (db) => {
    Term.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    Term.hasMany(db.Exam,       { foreignKey: 'termId', as: 'exams' });
    Term.hasMany(db.ReportCard, { foreignKey: 'termId', as: 'reportCards' });
    Term.hasMany(db.Council,    { foreignKey: 'termId', as: 'councils' });
  };
  return Term;
};
