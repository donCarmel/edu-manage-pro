'use strict';
module.exports = (sequelize, DataTypes) => {
  const TransportRoute = sequelize.define('TransportRoute', {
    id:            { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    routeName:     { type: DataTypes.STRING(100), allowNull: false },
    busNumber:     { type: DataTypes.STRING(20),  allowNull: false },
    driverName:    { type: DataTypes.STRING(160) },
    driverPhone:   { type: DataTypes.STRING(20) },
    capacity:      { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 40 },
    stops:         { type: DataTypes.JSON, allowNull: false },
    morningTime:   { type: DataTypes.TIME },
    afternoonTime: { type: DataTypes.TIME },
    status:        { type: DataTypes.ENUM('active','inactive','maintenance'), allowNull: false, defaultValue: 'active' },
  }, { tableName: 'transport_routes', underscored: true, timestamps: true });

  return TransportRoute;
};
