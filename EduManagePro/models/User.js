"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      firstName: { type: DataTypes.STRING(80), allowNull: false },
      lastName: { type: DataTypes.STRING(80), allowNull: false },
      email: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: { type: DataTypes.STRING(20) },
      avatarUrl: { type: DataTypes.STRING(500) },
      status: {
        type: DataTypes.ENUM("active", "inactive", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      twoFactorSecret: { 
        type: DataTypes.STRING(100) 
      },
      lastLoginAt: { 
        type: DataTypes.DATE 
      },
      lastLoginIp: { 
        type: DataTypes.STRING(45) 
      },
      passwordChangedAt: { 
        type: DataTypes.DATE 
      },
      emailVerifiedAt: { 
        type: DataTypes.DATE 
      },
    },
    { tableName: "users", underscored: true, timestamps: true },
  );

  User.associate = (db) => {
    User.belongsTo(db.Role, { foreignKey: "roleId", as: "role" });
    User.hasOne(db.Employee, { foreignKey: "userId", as: "employee" });
    User.hasOne(db.Parent, { foreignKey: "userId", as: "parent" });
    User.hasMany(db.ActivityLog, { foreignKey: "userId", as: "logs" });
  };
  return User;
};
