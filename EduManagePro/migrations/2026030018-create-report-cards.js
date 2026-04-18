'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('report_cards', {
      id:                   { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:           { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      term_id:              { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'terms', key: 'id' }, onDelete: 'RESTRICT' },
      general_average:      { type: Sequelize.DECIMAL(5,2) },
      class_rank:           { type: Sequelize.SMALLINT.UNSIGNED },
      class_total:          { type: Sequelize.SMALLINT.UNSIGNED },
      head_teacher_comment: { type: Sequelize.TEXT },
      principal_comment:    { type: Sequelize.TEXT },
      council_decision:     { type: Sequelize.ENUM('passage','redoublement','orientation','felicitations','encouragements','avertissement','tableau_honneur') },
      is_published:         { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      published_at:         { type: Sequelize.DATE },
      generated_by:         { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:           { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:           { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('report_cards', ['student_id','term_id'], { unique: true, name: 'uq_rc' });
    await qi.addIndex('report_cards', ['term_id'], { name: 'idx_rc_term' });
  },
  down: async (qi) => { await qi.dropTable('report_cards'); },
};