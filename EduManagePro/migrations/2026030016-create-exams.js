'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('exams', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      class_subject_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'class_subjects', key: 'id' }, onDelete: 'RESTRICT' },
      term_id:          { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'terms', key: 'id' }, onDelete: 'RESTRICT' },
      room_id:          { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'rooms', key: 'id' }, onDelete: 'SET NULL' },
      title:            { type: Sequelize.STRING(200), allowNull: false },
      exam_type:        { type: Sequelize.ENUM('controle','examen_final','tp','oral','devoir_maison'), allowNull: false, defaultValue: 'controle' },
      exam_date:        { type: Sequelize.DATEONLY, allowNull: false },
      start_time:       { type: Sequelize.TIME },
      duration_min:     { type: Sequelize.SMALLINT.UNSIGNED },
      max_score:        { type: Sequelize.DECIMAL(5,2), allowNull: false, defaultValue: 20.00 },
      coefficient:      { type: Sequelize.DECIMAL(4,2), allowNull: false, defaultValue: 1.00 },
      supervisor_id:    { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      notes:            { type: Sequelize.TEXT },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('exams', ['exam_date'], { name: 'idx_exam_date' });
    await qi.addIndex('exams', ['term_id'],   { name: 'idx_exam_term' });
  },
  down: async (qi) => { await qi.dropTable('exams'); },
};