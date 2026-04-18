'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('attendance', {
      id:           { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      class_id:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'classes',  key: 'id' }, onDelete: 'RESTRICT' },
      schedule_id:  { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'schedule', key: 'id' }, onDelete: 'SET NULL' },
      attend_date:  { type: Sequelize.DATEONLY, allowNull: false },
      period:       { type: Sequelize.TINYINT.UNSIGNED },
      status:       { type: Sequelize.ENUM('present','absent','late','excused'), allowNull: false, defaultValue: 'present' },
      late_minutes: { type: Sequelize.TINYINT.UNSIGNED, defaultValue: 0 },
      reason:       { type: Sequelize.STRING(300) },
      justified:    { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      recorded_by:  { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      recorded_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:   { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('attendance', ['student_id'],  { name: 'idx_att_student' });
    await qi.addIndex('attendance', ['attend_date'], { name: 'idx_att_date' });
    await qi.addIndex('attendance', ['class_id'],    { name: 'idx_att_class' });
  },
  down: async (qi) => { await qi.dropTable('attendance'); },
};