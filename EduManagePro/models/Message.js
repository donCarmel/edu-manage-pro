'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id:             { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    senderId:       { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    recipientId:    { type: DataTypes.INTEGER.UNSIGNED },
    recipientGroup: { type: DataTypes.STRING(60) },
    subject:        { type: DataTypes.STRING(300), allowNull: false },
    body:           { type: DataTypes.TEXT, allowNull: false },
    isRead:         { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    readAt:         { type: DataTypes.DATE },
    parentId:       { type: DataTypes.BIGINT.UNSIGNED },
    attachmentUrl:  { type: DataTypes.STRING(500) },
  }, { tableName: 'messages', underscored: true, timestamps: true, updatedAt: false });

  Message.associate = (db) => {
    Message.belongsTo(db.User,    { foreignKey: 'senderId',    as: 'sender' });
    Message.belongsTo(db.User,    { foreignKey: 'recipientId', as: 'recipient' });
    Message.belongsTo(db.Message, { foreignKey: 'parentId',    as: 'parentMessage' });
    Message.hasMany(db.Message,   { foreignKey: 'parentId',    as: 'replies' });
  };
  return Message;
};
