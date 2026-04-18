'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('grades', {
      id:         { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      exam_id:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'exams', key: 'id' }, onDelete: 'CASCADE' },
      student_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      score:      { type: Sequelize.DECIMAL(5,2) },
      is_absent:  { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      comment:    { type: Sequelize.STRING(500) },
      entered_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      entered_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('grades', ['exam_id', 'student_id'], { unique: true, name: 'uq_grade' });
    await qi.addIndex('grades', ['student_id'], { name: 'idx_grade_student' });
  },
  down: async (qi) => { await qi.dropTable('grades'); },
};