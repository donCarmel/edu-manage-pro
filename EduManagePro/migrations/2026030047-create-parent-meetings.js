'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('parent_meetings', {
      id:           { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      parent_id:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'parents',  key: 'id' }, onDelete: 'CASCADE' },
      teacher_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users',    key: 'id' }, onDelete: 'RESTRICT' },
      student_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      meeting_date: { type: Sequelize.DATEONLY, allowNull: false },
      meeting_time: { type: Sequelize.TIME, allowNull: false },
      duration_min: { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 20 },
      location:     { type: Sequelize.STRING(100) },
      reason:       { type: Sequelize.STRING(300), allowNull: false },
      status:       { type: Sequelize.ENUM('pending','confirmed','done','cancelled'), allowNull: false, defaultValue: 'pending' },
      notes:        { type: Sequelize.TEXT },
      created_by:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      created_at:   { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:   { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('parent_meetings', ['meeting_date'], { name: 'idx_pm_date' });
    await qi.addIndex('parent_meetings', ['parent_id'],    { name: 'idx_pm_parent' });
    await qi.addIndex('parent_meetings', ['student_id'],   { name: 'idx_pm_student' });
  },
  down: async (qi) => { await qi.dropTable('parent_meetings'); },
};