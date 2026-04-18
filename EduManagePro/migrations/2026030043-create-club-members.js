'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('club_members', {
      id:         { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      club_id:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'clubs',    key: 'id' }, onDelete: 'CASCADE' },
      student_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      joined_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      status:     { type: Sequelize.ENUM('active','inactive'), allowNull: false, defaultValue: 'active' },
    });
    await qi.addIndex('club_members', ['club_id','student_id'], { unique: true, name: 'uq_cm' });
    await qi.addIndex('club_members', ['student_id'],           { name: 'idx_cm_student' });
  },
  down: async (qi) => { await qi.dropTable('club_members'); },
};