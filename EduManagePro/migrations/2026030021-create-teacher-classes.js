'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('teacher_classes', {
      teacher_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, references: { model: 'employees', key: 'id' }, onDelete: 'CASCADE' },
      class_id:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, references: { model: 'classes',   key: 'id' }, onDelete: 'CASCADE' },
      is_primary: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    });
  },
  down: async (qi) => { await qi.dropTable('teacher_classes'); },
};