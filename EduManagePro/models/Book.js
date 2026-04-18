'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id:              { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    isbn:            { type: DataTypes.STRING(20), unique: true },
    title:           { type: DataTypes.STRING(300), allowNull: false },
    author:          { type: DataTypes.STRING(200), allowNull: false },
    publisher:       { type: DataTypes.STRING(150) },
    publishYear:     { type: DataTypes.SMALLINT.UNSIGNED },
    category:        { type: DataTypes.STRING(60) },
    totalCopies:     { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
    availableCopies: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
    locationShelf:   { type: DataTypes.STRING(30) },
    coverUrl:        { type: DataTypes.STRING(500) },
    description:     { type: DataTypes.TEXT },
    status:          { type: DataTypes.ENUM('available','unavailable'), allowNull: false, defaultValue: 'available' },
  }, { tableName: 'books', underscored: true, timestamps: true });

  Book.associate = (db) => {
    Book.hasMany(db.BookLoan,        { foreignKey: 'bookId', as: 'loans' });
    Book.hasMany(db.BookReservation, { foreignKey: 'bookId', as: 'reservations' });
  };
  return Book;
};
