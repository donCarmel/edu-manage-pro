'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name:           { type: DataTypes.STRING(50),  allowNull: false, unique: true },
    label:          { type: DataTypes.STRING(100), allowNull: false },
    priorityLevel:  { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 5 },
  }, { tableName: 'roles', underscored: true, timestamps: true });

  Role.associate = (db) => {
    Role.hasMany(db.User,           { foreignKey: 'roleId', as: 'users' });
    Role.belongsToMany(db.Permission, { through: db.RolePermission, foreignKey: 'roleId', as: 'permissions' });
  };
  return Role;
};
