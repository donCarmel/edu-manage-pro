'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookReservation = sequelize.define('BookReservation', {
    id:          { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    bookId:      { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId:   { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    reservedAt:  { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    expiresAt:   { type: DataTypes.DATE },
    status:      { type: DataTypes.ENUM('waiting','ready','fulfilled','cancelled'), allowNull: false, defaultValue: 'waiting' },
    notifiedAt:  { type: DataTypes.DATE },
  }, { tableName: 'book_reservations', underscored: true, timestamps: false });

  BookReservation.associate = (db) => {
    BookReservation.belongsTo(db.Book,    { foreignKey: 'bookId',    as: 'book' });
    BookReservation.belongsTo(db.Student, { foreignKey: 'studentId', as: 'student' });
  };
  return BookReservation;
};
