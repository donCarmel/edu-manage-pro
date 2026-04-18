'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id:          { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    module:      { type: DataTypes.STRING(60), allowNull: false },
    action:      { type: DataTypes.STRING(30), allowNull: false },
    description: { type: DataTypes.STRING(200) },
  }, { tableName: 'permissions', underscored: true, timestamps: false });

  Permission.associate = (db) => {
    Permission.belongsToMany(db.Role, { through: db.RolePermission, foreignKey: 'permissionId', as: 'roles' });
  };
  return Permission;
};
