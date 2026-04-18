'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('canteen_menus', {
      id:          { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      menu_date:   { type: Sequelize.DATEONLY, allowNull: false, unique: true },
      day_of_week: { type: Sequelize.TINYINT.UNSIGNED, allowNull: false },
      starter:     { type: Sequelize.STRING(200) },
      main_course: { type: Sequelize.STRING(200), allowNull: false },
      side_dish:   { type: Sequelize.STRING(200) },
      dessert:     { type: Sequelize.STRING(200) },
      allergens:   { type: Sequelize.STRING(300) },
      calories:    { type: Sequelize.SMALLINT.UNSIGNED },
      created_by:  { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  down: async (qi) => { await qi.dropTable('canteen_menus'); },
};