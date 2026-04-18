'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubMember = sequelize.define('ClubMember', {
    id:        { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    clubId:    { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    joinedAt:  { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    status:    { type: DataTypes.ENUM('active','inactive'), allowNull: false, defaultValue: 'active' },
  }, { tableName: 'club_members', underscored: true, timestamps: false });

  ClubMember.associate = (db) => {
    ClubMember.belongsTo(db.Club,    { foreignKey: 'clubId',    as: 'club' });
    ClubMember.belongsTo(db.Student, { foreignKey: 'studentId', as: 'student' });
  };
  return ClubMember;
};
