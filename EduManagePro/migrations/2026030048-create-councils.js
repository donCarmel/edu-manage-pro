'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('councils', {
      id:            { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      class_id:      { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'classes', key: 'id' }, onDelete: 'RESTRICT' },
      term_id:       { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'terms',   key: 'id' }, onDelete: 'RESTRICT' },
      council_date:  { type: Sequelize.DATEONLY, allowNull: false },
      council_time:  { type: Sequelize.TIME },
      room_id:       { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'rooms', key: 'id' }, onDelete: 'SET NULL' },
      president_id:  { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      status:        { type: Sequelize.ENUM('planned','done','cancelled'), allowNull: false, defaultValue: 'planned' },
      minutes_url:   { type: Sequelize.STRING(500) },
      general_notes: { type: Sequelize.TEXT },
      created_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('councils', ['class_id','term_id'], { unique: true, name: 'uq_council' });
    await qi.addIndex('councils', ['class_id'], { name: 'idx_council_class' });
    await qi.addIndex('councils', ['term_id'],  { name: 'idx_council_term' });
  },
  down: async (qi) => { await qi.dropTable('councils'); },
};