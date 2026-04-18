'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomReservation = sequelize.define('RoomReservation', {
    id:              { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    roomId:          { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    requestedBy:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    reservationDate: { type: DataTypes.DATEONLY, allowNull: false },
    startTime:       { type: DataTypes.TIME, allowNull: false },
    endTime:         { type: DataTypes.TIME, allowNull: false },
    purpose:         { type: DataTypes.STRING(300), allowNull: false },
    status:          { type: DataTypes.ENUM('pending','confirmed','cancelled','rejected'), allowNull: false, defaultValue: 'pending' },
    approvedBy:      { type: DataTypes.INTEGER.UNSIGNED },
    approvedAt:      { type: DataTypes.DATE },
    notes:           { type: DataTypes.STRING(300) },
  }, { tableName: 'room_reservations', underscored: true, timestamps: true });

  RoomReservation.associate = (db) => {
    RoomReservation.belongsTo(db.Room, { foreignKey: 'roomId',      as: 'room' });
    RoomReservation.belongsTo(db.User, { foreignKey: 'requestedBy', as: 'requester' });
    RoomReservation.belongsTo(db.User, { foreignKey: 'approvedBy',  as: 'approver' });
  };
  return RoomReservation;
};
