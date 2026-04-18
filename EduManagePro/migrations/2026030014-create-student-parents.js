'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('student_parents', {
      student_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      parent_id:  { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, references: { model: 'parents',  key: 'id' }, onDelete: 'CASCADE' },
      is_primary: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    });
  },
  down: async (qi) => { await qi.dropTable('student_parents'); },
};