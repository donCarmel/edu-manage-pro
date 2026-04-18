'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('clubs', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name:             { type: Sequelize.STRING(150), allowNull: false },
      category:         { type: Sequelize.ENUM('sport','arts','sciences','musique','langues','jeux','autre'), allowNull: false, defaultValue: 'autre' },
      description:      { type: Sequelize.TEXT },
      supervisor_id:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      room_id:          { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'rooms', key: 'id' }, onDelete: 'SET NULL' },
      max_members:      { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 30 },
      current_members:  { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0 },
      schedule_info:    { type: Sequelize.STRING(200) },
      budget:           { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'RESTRICT' },
      status:           { type: Sequelize.ENUM('active','inactive','suspended'), allowNull: false, defaultValue: 'active' },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('clubs', ['academic_year_id'], { name: 'idx_club_ay' });
    await qi.addIndex('clubs', ['status'],           { name: 'idx_club_status' });
  },
  down: async (qi) => { await qi.dropTable('clubs'); },
};