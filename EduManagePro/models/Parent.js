'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
    id:                 { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId:             { type: DataTypes.INTEGER.UNSIGNED, unique: true },
    firstName:          { type: DataTypes.STRING(80), allowNull: false },
    lastName:           { type: DataTypes.STRING(80), allowNull: false },
    gender:             { type: DataTypes.ENUM('M','F','autre') },
    relationship:       { type: DataTypes.STRING(40), allowNull: false },
    phoneMobile:        { type: DataTypes.STRING(20) },
    phoneWork:          { type: DataTypes.STRING(20) },
    email:              { type: DataTypes.STRING(180) },
    address:            { type: DataTypes.TEXT },
    city:               { type: DataTypes.STRING(100) },
    postalCode:         { type: DataTypes.STRING(10) },
    profession:         { type: DataTypes.STRING(100) },
    isEmergencyContact: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  }, { tableName: 'parents', underscored: true, timestamps: true });

  Parent.associate = (db) => {
    Parent.belongsTo(db.User,      { foreignKey: 'userId', as: 'user' });
    Parent.belongsToMany(db.Student, { through: db.StudentParent, foreignKey: 'parentId', as: 'students' });
    Parent.hasMany(db.ParentMeeting, { foreignKey: 'parentId', as: 'meetings' });
  };
  return Parent;
};
