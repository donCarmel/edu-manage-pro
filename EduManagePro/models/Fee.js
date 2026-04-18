'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define('Fee', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    academicYearId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    label:          { type: DataTypes.STRING(120), allowNull: false },
    level:          { type: DataTypes.STRING(30) },
    amount:         { type: DataTypes.DECIMAL(10,2), allowNull: false },
    dueDate:        { type: DataTypes.DATEONLY },
    isMandatory:    { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    description:    { type: DataTypes.TEXT },
  }, { tableName: 'fees', underscored: true, timestamps: true });

  Fee.associate = (db) => {
    Fee.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    Fee.hasMany(db.FeePayment,     { foreignKey: 'feeId',          as: 'payments' });
  };
  return Fee;
};
