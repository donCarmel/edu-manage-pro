'use strict';
module.exports = (sequelize, DataTypes) => {
  const CanteenSubscription = sequelize.define('CanteenSubscription', {
    id:             { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:      { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    academicYearId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    formula:        { type: DataTypes.ENUM('5j','3j','ticket'), allowNull: false, defaultValue: '5j' },
    monthlyFee:     { type: DataTypes.DECIMAL(8,2), allowNull: false, defaultValue: 0 },
    dietType:       { type: DataTypes.ENUM('standard','sans_porc','vegetarien','sans_gluten','autre'), allowNull: false, defaultValue: 'standard' },
    startDate:      { type: DataTypes.DATEONLY, allowNull: false },
    endDate:        { type: DataTypes.DATEONLY },
    status:         { type: DataTypes.ENUM('active','suspended','cancelled'), allowNull: false, defaultValue: 'active' },
  }, { tableName: 'canteen_subscriptions', underscored: true, timestamps: true });

  CanteenSubscription.associate = (db) => {
    CanteenSubscription.belongsTo(db.Student,      { foreignKey: 'studentId',      as: 'student' });
    CanteenSubscription.belongsTo(db.AcademicYear, { foreignKey: 'academicYearId', as: 'academicYear' });
    CanteenSubscription.hasMany(db.CanteenAttendance, { foreignKey: 'canteenSubscriptionId', as: 'attendances' });
  };
  return CanteenSubscription;
};
