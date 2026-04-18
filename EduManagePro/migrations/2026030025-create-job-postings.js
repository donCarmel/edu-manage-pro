'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('job_postings', {
      id:            { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      title:         { type: Sequelize.STRING(150), allowNull: false },
      department:    { type: Sequelize.STRING(80),  allowNull: false },
      contract_type: { type: Sequelize.ENUM('CDI','CDD','vacataire','stage'), allowNull: false },
      description:   { type: Sequelize.TEXT },
      requirements:  { type: Sequelize.TEXT },
      status:        { type: Sequelize.ENUM('open','closed','filled'), allowNull: false, defaultValue: 'open' },
      posted_at:     { type: Sequelize.DATEONLY, allowNull: false },
      deadline:      { type: Sequelize.DATEONLY },
      filled_by:     { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'employees', key: 'id' }, onDelete: 'SET NULL' },
      created_by:    { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('job_postings', ['status'], { name: 'idx_jp_status' });
  },
  down: async (qi) => { await qi.dropTable('job_postings'); },
};