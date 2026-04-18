"use strict";
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subject",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      shortCode: { type: DataTypes.STRING(10), allowNull: false, unique: true },
      category: { type: DataTypes.STRING(50) },
      colorHex: { type: DataTypes.STRING(7), defaultValue: "#3b82f6" },
      coefficient: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: 1.0,
      },
    },
    { tableName: "subjects", underscored: true, timestamps: true },
  );

  Subject.associate = (db) => {
    Subject.hasMany(db.ClassSubject, {
      foreignKey: "subjectId",
      as: "classSubjects",
    });
  };
  return Subject;
};
