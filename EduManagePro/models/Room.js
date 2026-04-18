"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      type: {
        type: DataTypes.ENUM(
          "cours",
          "laboratoire",
          "amphi",
          "informatique",
          "sport",
          "arts",
          "musique",
          "reunion",
          "autre",
        ),
        allowNull: false,
        defaultValue: "cours",
      },
      capacity: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 30,
      },
      building: { type: DataTypes.STRING(60) },
      floor: { type: DataTypes.STRING(20) },
      equipment: { type: DataTypes.JSON },
      status: {
        type: DataTypes.ENUM("available", "maintenance", "unavailable"),
        allowNull: false,
        defaultValue: "available",
      },
      notes: { type: DataTypes.TEXT },
    },
    { tableName: "rooms", underscored: true, timestamps: true },
  );

  Room.associate = (db) => {
    Room.hasMany(db.Class, { foreignKey: "roomId", as: "classes" });
    Room.hasMany(db.Schedule, { foreignKey: "roomId", as: "schedules" });
    Room.hasMany(db.Exam, { foreignKey: "roomId", as: "exams" });
    Room.hasMany(db.RoomReservation, {
      foreignKey: "roomId",
      as: "reservations",
    });
    Room.hasMany(db.Club, { foreignKey: "roomId", as: "clubs" });
    Room.hasMany(db.Council, { foreignKey: "roomId", as: "councils" });
  };
  return Room;
};
