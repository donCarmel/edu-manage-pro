'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalStock = sequelize.define('MedicalStock', {
    id:           { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name:         { type: DataTypes.STRING(150), allowNull: false },
    category:     { type: DataTypes.STRING(60),  allowNull: false },
    quantity:     { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 0 },
    unit:         { type: DataTypes.STRING(30),  allowNull: false, defaultValue: 'comprimé' },
    expiryDate:   { type: DataTypes.DATEONLY },
    minimumStock: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 5 },
    location:     { type: DataTypes.STRING(100) },
    updatedBy:    { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'medical_stock', underscored: true, timestamps: true });

  MedicalStock.associate = (db) => {
    MedicalStock.belongsTo(db.User, { foreignKey: 'updatedBy', as: 'updatedByUser' });
  };
  return MedicalStock;
};
