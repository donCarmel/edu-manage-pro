'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('council_decisions', {
      id:                      { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      council_id:              { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'councils', key: 'id' }, onDelete: 'CASCADE' },
      student_id:              { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      general_average:         { type: Sequelize.DECIMAL(5,2) },
      class_rank:              { type: Sequelize.SMALLINT.UNSIGNED },
      head_teacher_appreciation:{ type: Sequelize.TEXT },
      decision:                { type: Sequelize.ENUM('passage','redoublement','orientation','felicitations','encouragements','avertissement','tableau_honneur') },
      advice:                  { type: Sequelize.TEXT },
      created_at:              { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:              { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('council_decisions', ['council_id','student_id'], { unique: true, name: 'uq_cd' });
    await qi.addIndex('council_decisions', ['student_id'], { name: 'idx_cd_student' });
  },
  down: async (qi) => { await qi.dropTable('council_decisions'); },
};