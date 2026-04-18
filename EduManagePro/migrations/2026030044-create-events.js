'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('events', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      academic_year_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'academic_years', key: 'id' }, onDelete: 'RESTRICT' },
      title:            { type: Sequelize.STRING(200), allowNull: false },
      event_type:       { type: Sequelize.ENUM('sortie','spectacle','competition','atelier','ceremonie','reunion','autre'), allowNull: false, defaultValue: 'autre' },
      description:      { type: Sequelize.TEXT },
      event_date:       { type: Sequelize.DATEONLY, allowNull: false },
      start_time:       { type: Sequelize.TIME },
      end_time:         { type: Sequelize.TIME },
      location:         { type: Sequelize.STRING(200) },
      organizer_id:     { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      budget:           { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      max_participants: { type: Sequelize.SMALLINT.UNSIGNED },
      status:           { type: Sequelize.ENUM('planned','confirmed','cancelled','done'), allowNull: false, defaultValue: 'planned' },
      notes:            { type: Sequelize.TEXT },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('events', ['event_date'], { name: 'idx_event_date' });
    await qi.addIndex('events', ['status'],     { name: 'idx_event_status' });
  },
  down: async (qi) => { await qi.dropTable('events'); },
};