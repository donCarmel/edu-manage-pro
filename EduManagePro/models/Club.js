'use strict';
module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name:           { type: DataTypes.STRING(150), allowNull: false },
    category:       { type: DataTypes.ENUM('sport','arts','sciences','musique','langues','jeux','autre'), allowNull: false, defaultValue: 'autre' },
    description:    { type: DataTypes.TEXT },
    supervisorId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    roomId:         { type: DataTypes.INTEGER.UNSIGNED },
    maxMembers:     { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 30 },
    currentMembers: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0 },
    scheduleInfo:   { type: DataTypes.STRING(200) },
    budget:         { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    academicYearId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status:         { type: DataTypes.ENUM('active','inactive','suspended'), allowNull: false, defaultValue: 'active' },
  }, { tableName: 'clubs', underscored: true, timestamps: true });

  Club.associate = (db) => {
    Club.belongsTo(db.User,         { foreignKey: 'supervisorId',   as: 'supervisor' });
    Club.belongsTo(db.Room,         { foreignKey: 'roomId',         as: 'room' });
    Club.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    Club.hasMany(db.ClubMember,     { foreignKey: 'clubId',         as: 'members' });
  };
  return Club;
};
