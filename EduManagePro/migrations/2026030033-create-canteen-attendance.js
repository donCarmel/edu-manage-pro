'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('canteen_attendance', {
      id:                      { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      student_id:              { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE' },
      canteen_subscription_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'canteen_subscriptions', key: 'id' }, onDelete: 'SET NULL' },
      attend_date:             { type: Sequelize.DATEONLY, allowNull: false },
      status:                  { type: Sequelize.ENUM('present','absent','ticket'), allowNull: false, defaultValue: 'present' },
      recorded_by:             { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:              { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('canteen_attendance', ['student_id','attend_date'], { unique: true, name: 'uq_ca' });
    await qi.addIndex('canteen_attendance', ['attend_date'], { name: 'idx_ca_date' });
  },
  down: async (qi) => { await qi.dropTable('canteen_attendance'); },
};