'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('parents', {
      id:                  { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id:             { type: Sequelize.INTEGER.UNSIGNED, unique: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      first_name:          { type: Sequelize.STRING(80), allowNull: false },
      last_name:           { type: Sequelize.STRING(80), allowNull: false },
      gender:              { type: Sequelize.ENUM('M','F','autre') },
      relationship:        { type: Sequelize.STRING(40), allowNull: false },
      phone_mobile:        { type: Sequelize.STRING(20) },
      phone_work:          { type: Sequelize.STRING(20) },
      email:               { type: Sequelize.STRING(180) },
      address:             { type: Sequelize.TEXT },
      city:                { type: Sequelize.STRING(100) },
      postal_code:         { type: Sequelize.STRING(10) },
      profession:          { type: Sequelize.STRING(100) },
      is_emergency_contact:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:          { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('parents', ['last_name','first_name'], { name: 'idx_parents_name' });
  },
  down: async (qi) => { await qi.dropTable('parents'); },
};