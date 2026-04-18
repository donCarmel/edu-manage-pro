'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('rooms', {
      id:        { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name:      { type: Sequelize.STRING(50), allowNull: false, unique: true },
      type:      { type: Sequelize.ENUM('cours','laboratoire','amphi','informatique','sport','arts','musique','reunion','autre'), allowNull: false, defaultValue: 'cours' },
      capacity:  { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 30 },
      building:  { type: Sequelize.STRING(60) },
      floor:     { type: Sequelize.STRING(20) },
      equipment: { type: Sequelize.JSON },
      status:    { type: Sequelize.ENUM('available','maintenance','unavailable'), allowNull: false, defaultValue: 'available' },
      notes:     { type: Sequelize.TEXT },
      created_at:{ type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:{ type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('rooms', ['type'],   { name: 'idx_rooms_type' });
    await qi.addIndex('rooms', ['status'], { name: 'idx_rooms_status' });
  },
  down: async (qi) => { await qi.dropTable('rooms'); },
};
