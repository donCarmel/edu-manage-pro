'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    employeeId:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    academicYearId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    evaluatorId:    { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    evalDate:       { type: DataTypes.DATEONLY, allowNull: false },
    score:          { type: DataTypes.DECIMAL(3,1) },
    criteria:       { type: DataTypes.JSON },
    strengths:      { type: DataTypes.TEXT },
    improvements:   { type: DataTypes.TEXT },
    overallComment: { type: DataTypes.TEXT },
    status:         { type: DataTypes.ENUM('draft','signed','archived'), allowNull: false, defaultValue: 'draft' },
  }, { tableName: 'evaluations', underscored: true, timestamps: true });

  Evaluation.associate = (db) => {
    Evaluation.belongsTo(db.Employee,     { foreignKey: 'employeeId',     as: 'employee' });
    Evaluation.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    Evaluation.belongsTo(db.User,         { foreignKey: 'evaluatorId',    as: 'evaluator' });
  };
  return Evaluation;
};
