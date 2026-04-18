'use strict';
module.exports = (sequelize, DataTypes) => {
  const FeePayment = sequelize.define('FeePayment', {
    id:            { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    feeId:         { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    amountPaid:    { type: DataTypes.DECIMAL(10,2), allowNull: false },
    paidAt:        { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    paymentMethod: { type: DataTypes.ENUM('virement','cheque','especes','carte'), defaultValue: 'especes' },
    receiptNumber: { type: DataTypes.STRING(50) },
    recordedBy:    { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    notes:         { type: DataTypes.STRING(300) },
  }, { tableName: 'fee_payments', underscored: true, timestamps: false });

  FeePayment.associate = (db) => {
    FeePayment.belongsTo(db.Fee,     { foreignKey: 'feeId',      as: 'fee' });
    FeePayment.belongsTo(db.Student, { foreignKey: 'studentId',  as: 'student' });
    FeePayment.belongsTo(db.User,    { foreignKey: 'recordedBy', as: 'recorder' });
  };
  return FeePayment;
};
