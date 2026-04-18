'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('messages', {
      id:              { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      sender_id:       { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      recipient_id:    { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      recipient_group: { type: Sequelize.STRING(60) },
      subject:         { type: Sequelize.STRING(300), allowNull: false },
      body:            { type: Sequelize.TEXT, allowNull: false },
      is_read:         { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      read_at:         { type: Sequelize.DATE },
      parent_id:       { type: Sequelize.BIGINT.UNSIGNED, references: { model: 'messages', key: 'id' }, onDelete: 'SET NULL' },
      attachment_url:  { type: Sequelize.STRING(500) },
      created_at:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('messages', ['sender_id'],    { name: 'idx_msg_sender' });
    await qi.addIndex('messages', ['recipient_id'], { name: 'idx_msg_recipient' });
    await qi.addIndex('messages', ['created_at'],   { name: 'idx_msg_created' });
  },
  down: async (qi) => { await qi.dropTable('messages'); },
};