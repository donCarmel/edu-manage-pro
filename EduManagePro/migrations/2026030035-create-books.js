'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('books', {
      id:               { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      isbn:             { type: Sequelize.STRING(20), unique: true },
      title:            { type: Sequelize.STRING(300), allowNull: false },
      author:           { type: Sequelize.STRING(200), allowNull: false },
      publisher:        { type: Sequelize.STRING(150) },
      publish_year:     { type: Sequelize.SMALLINT.UNSIGNED },
      category:         { type: Sequelize.STRING(60) },
      total_copies:     { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
      available_copies: { type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
      location_shelf:   { type: Sequelize.STRING(30) },
      cover_url:        { type: Sequelize.STRING(500) },
      description:      { type: Sequelize.TEXT },
      status:           { type: Sequelize.ENUM('available','unavailable'), allowNull: false, defaultValue: 'available' },
      created_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
    await qi.addIndex('books', ['category'], { name: 'idx_book_category' });
    await qi.addIndex('books', ['title'],    { name: 'idx_book_title' });
  },
  down: async (qi) => { await qi.dropTable('books'); },
};