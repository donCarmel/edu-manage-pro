'use strict';
module.exports = (sequelize, DataTypes) => {
  const Council = sequelize.define('Council', {
    id:           { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    classId:      { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    termId:       { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    councilDate:  { type: DataTypes.DATEONLY, allowNull: false },
    councilTime:  { type: DataTypes.TIME },
    roomId:       { type: DataTypes.INTEGER.UNSIGNED },
    presidentId:  { type: DataTypes.INTEGER.UNSIGNED },
    status:       { type: DataTypes.ENUM('planned','done','cancelled'), allowNull: false, defaultValue: 'planned' },
    minutesUrl:   { type: DataTypes.STRING(500) },
    generalNotes: { type: DataTypes.TEXT },
  }, { tableName: 'councils', underscored: true, timestamps: true });

  Council.associate = (db) => {
    Council.belongsTo(db.Class, { foreignKey: 'classId',    as: 'class' });
    Council.belongsTo(db.Term,  { foreignKey: 'termId',     as: 'term' });
    Council.belongsTo(db.Room,  { foreignKey: 'roomId',     as: 'room' });
    Council.belongsTo(db.User,  { foreignKey: 'presidentId', as: 'president' });
    Council.hasMany(db.CouncilDecision, { foreignKey: 'councilId', as: 'decisions' });
  };
  return Council;
};
