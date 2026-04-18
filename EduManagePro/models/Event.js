'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id:              { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    academicYearId:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    title:           { type: DataTypes.STRING(200), allowNull: false },
    eventType:       { type: DataTypes.ENUM('sortie','spectacle','competition','atelier','ceremonie','reunion','autre'), allowNull: false, defaultValue: 'autre' },
    description:     { type: DataTypes.TEXT },
    eventDate:       { type: DataTypes.DATEONLY, allowNull: false },
    startTime:       { type: DataTypes.TIME },
    endTime:         { type: DataTypes.TIME },
    location:        { type: DataTypes.STRING(200) },
    organizerId:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    budget:          { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    maxParticipants: { type: DataTypes.SMALLINT.UNSIGNED },
    status:          { type: DataTypes.ENUM('planned','confirmed','cancelled','done'), allowNull: false, defaultValue: 'planned' },
    notes:           { type: DataTypes.TEXT },
  }, { tableName: 'events', underscored: true, timestamps: true });

  Event.associate = (db) => {
    Event.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    Event.belongsTo(db.User,         { foreignKey: 'organizerId',    as: 'organizer' });
  };
  return Event;
};
