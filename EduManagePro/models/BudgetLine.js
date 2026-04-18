'use strict';
module.exports = (sequelize, DataTypes) => {
  const BudgetLine = sequelize.define('BudgetLine', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    academicYearId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    category:       { type: DataTypes.STRING(80),  allowNull: false },
    type:           { type: DataTypes.ENUM('income','expense'), allowNull: false },
    label:          { type: DataTypes.STRING(200), allowNull: false },
    plannedAmount:  { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    actualAmount:   { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    notes:          { type: DataTypes.TEXT },
  }, { tableName: 'budget_lines', underscored: true, timestamps: true });

  BudgetLine.associate = (db) => {
    BudgetLine.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
  };
  return BudgetLine;
};
