'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('schedule', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      class_subject_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'class_subjects', key: 'id' }, onDelete: 'CASCADE' },
      room_id:          { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'rooms', key: 'id' }, onDelete: 'SET NULL' },
      day_of_week:      { type: Sequelize.TINYINT.UNSIGNED, allowNull: false },
      start_time:       { type: Sequelize.TIME, allowNull: false },
      end_time:         { type: Sequelize.TIME, allowNull: false },
      recurrence:       { type: Sequelize.ENUM('weekly','biweekly','once'), allowNull: false, defaultValue: 'weekly' },
      valid_from:       { type: Sequelize.DATEONLY },
      valid_until:      { type: Sequelize.DATEONLY },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('schedule', ['day_of_week'],      { name: 'idx_sched_day' });
    await qi.addIndex('schedule', ['class_subject_id'], { name: 'idx_sched_cs' });
  },
  down: async (qi) => { await qi.dropTable('schedule'); },
};
