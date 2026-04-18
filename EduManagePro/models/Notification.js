'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id:              { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title:           { type: DataTypes.STRING(200), allowNull: false },
    body:            { type: DataTypes.TEXT, allowNull: false },
    type:            { type: DataTypes.ENUM('info','urgent','rappel','bulletin','absence','paiement'), allowNull: false, defaultValue: 'info' },
    target:          { type: DataTypes.ENUM('all_parents','class','student','teacher','all'), allowNull: false, defaultValue: 'all_parents' },
    targetId:        { type: DataTypes.INTEGER.UNSIGNED },
    sentBy:          { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    sentAt:          { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    recipientsCount: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 0 },
  }, { tableName: 'notifications', underscored: true, timestamps: false });

  Notification.associate = (db) => {
    Notification.belongsTo(db.User, { foreignKey: 'sentBy', as: 'sender' });
  };
  return Notification;
};
