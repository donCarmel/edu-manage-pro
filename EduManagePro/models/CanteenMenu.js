'use strict';
module.exports = (sequelize, DataTypes) => {
  const CanteenMenu = sequelize.define('CanteenMenu', {
    id:         { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    menuDate:   { type: DataTypes.DATEONLY, allowNull: false, unique: true },
    dayOfWeek:  { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    starter:    { type: DataTypes.STRING(200) },
    mainCourse: { type: DataTypes.STRING(200), allowNull: false },
    sideDish:   { type: DataTypes.STRING(200) },
    dessert:    { type: DataTypes.STRING(200) },
    allergens:  { type: DataTypes.STRING(300) },
    calories:   { type: DataTypes.SMALLINT.UNSIGNED },
    createdBy:  { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'canteen_menus', underscored: true, timestamps: true });

  CanteenMenu.associate = (db) => {
    CanteenMenu.belongsTo(db.User, { foreignKey: 'createdBy', as: 'creator' });
  };
  return CanteenMenu;
};
