'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('notifications', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      title:            { type: Sequelize.STRING(200), allowNull: false },
      body:             { type: Sequelize.TEXT, allowNull: false },
      type:             { type: Sequelize.ENUM('info','urgent','rappel','bulletin','absence','paiement'), allowNull: false, defaultValue: 'info' },
      target:           { type: Sequelize.ENUM('all_parents','class','student','teacher','all'), allowNull: false, defaultValue: 'all_parents' },
      target_id:        { type: Sequelize.INTEGER.UNSIGNED },
      sent_by:          { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      sent_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      recipients_count: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false, defaultValue: 0 },
    });
    await qi.addIndex('notifications', ['type'],   { name: 'idx_notif_type' });
    await qi.addIndex('notifications', ['sent_at'],{ name: 'idx_notif_sent' });
  },
  down: async (qi) => { await qi.dropTable('notifications'); },
};