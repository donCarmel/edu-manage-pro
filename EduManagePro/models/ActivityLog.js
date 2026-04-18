'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id:          { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId:      { type: DataTypes.INTEGER.UNSIGNED },
    action:      { type: DataTypes.STRING(60),  allowNull: false },
    module:      { type: DataTypes.STRING(60),  allowNull: false },
    recordId:    { type: DataTypes.INTEGER.UNSIGNED },
    description: { type: DataTypes.TEXT },
    ipAddress:   { type: DataTypes.STRING(45) },
    userAgent:   { type: DataTypes.STRING(500) },
  }, { tableName: 'activity_logs', underscored: true, timestamps: true, updatedAt: false });

  ActivityLog.associate = (db) => {
    ActivityLog.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
  };
  return ActivityLog;
};
