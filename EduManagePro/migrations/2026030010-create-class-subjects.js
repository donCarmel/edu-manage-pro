'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('class_subjects', {
      id:         { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      class_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'classes',  key: 'id' }, onDelete: 'CASCADE' },
      subject_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'subjects', key: 'id' }, onDelete: 'RESTRICT' },
      teacher_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users',    key: 'id' }, onDelete: 'RESTRICT' },
      hours_week: { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 2 },
    });
    await qi.addIndex('class_subjects', ['class_id', 'subject_id'], { unique: true, name: 'uq_cs' });
    await qi.addIndex('class_subjects', ['teacher_id'], { name: 'idx_cs_teacher' });
  },
  down: async (qi) => { await qi.dropTable('class_subjects'); },
};
