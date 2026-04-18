'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    id:           { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    employeeId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    leaveType:    { type: DataTypes.ENUM('conge_annuel','rtt','maladie','maternite','paternite','exceptionnel','sans_solde','formation'), allowNull: false },
    startDate:    { type: DataTypes.DATEONLY, allowNull: false },
    endDate:      { type: DataTypes.DATEONLY, allowNull: false },
    daysCount:    { type: DataTypes.DECIMAL(4,1), allowNull: false, defaultValue: 1 },
    reason:       { type: DataTypes.TEXT },
    status:       { type: DataTypes.ENUM('pending','approved','refused','cancelled'), allowNull: false, defaultValue: 'pending' },
    approvedBy:   { type: DataTypes.INTEGER.UNSIGNED },
    approvedAt:   { type: DataTypes.DATE },
    substituteId: { type: DataTypes.INTEGER.UNSIGNED },
    documentUrl:  { type: DataTypes.STRING(500) },
  }, { tableName: 'leaves', underscored: true, timestamps: true });

  Leave.associate = (db) => {
    Leave.belongsTo(db.Employee, { foreignKey: 'employeeId',   as: 'employee' });
    Leave.belongsTo(db.User,     { foreignKey: 'approvedBy',   as: 'approver' });
    Leave.belongsTo(db.Employee, { foreignKey: 'substituteId', as: 'substitute' });
  };
  return Leave;
};
