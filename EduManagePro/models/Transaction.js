'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id:              { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    academicYearId:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    type:            { type: DataTypes.ENUM('income','expense'), allowNull: false },
    category:        { type: DataTypes.STRING(80), allowNull: false },
    description:     { type: DataTypes.STRING(300) },
    amount:          { type: DataTypes.DECIMAL(12,2), allowNull: false },
    transactionDate: { type: DataTypes.DATEONLY, allowNull: false },
    reference:       { type: DataTypes.STRING(100) },
    paymentMethod:   { type: DataTypes.ENUM('virement','cheque','especes','carte','prelevement'), defaultValue: 'virement' },
    status:          { type: DataTypes.ENUM('pending','paid','cancelled','refunded'), allowNull: false, defaultValue: 'paid' },
    studentId:       { type: DataTypes.INTEGER.UNSIGNED },
    employeeId:      { type: DataTypes.INTEGER.UNSIGNED },
    recordedBy:      { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    attachmentUrl:   { type: DataTypes.STRING(500) },
  }, { tableName: 'transactions', underscored: true, timestamps: true });

  Transaction.associate = (db) => {
    Transaction.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    Transaction.belongsTo(db.Student,      { foreignKey: 'studentId',      as: 'student' });
    Transaction.belongsTo(db.Employee,     { foreignKey: 'employeeId',     as: 'employee' });
    Transaction.belongsTo(db.User,         { foreignKey: 'recordedBy',     as: 'recorder' });
  };
  return Transaction;
};
