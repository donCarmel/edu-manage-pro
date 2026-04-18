'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    id:                  { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    designation:         { type: DataTypes.STRING(200), allowNull: false },
    category:            { type: DataTypes.STRING(60),  allowNull: false },
    acquisitionDate:     { type: DataTypes.DATEONLY },
    acquisitionCost:     { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    currentValue:        { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    annualDepreciation:  { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    location:            { type: DataTypes.STRING(100) },
    serialNumber:        { type: DataTypes.STRING(100) },
    status:              { type: DataTypes.ENUM('bon_etat','a_renouveler','hors_service','neuf'), allowNull: false, defaultValue: 'bon_etat' },
    notes:               { type: DataTypes.TEXT },
  }, { tableName: 'assets', underscored: true, timestamps: true });

  return Asset;
};
