'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookLoan = sequelize.define('BookLoan', {
    id:           { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    bookId:       { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId:    { type: DataTypes.INTEGER.UNSIGNED },
    userId:       { type: DataTypes.INTEGER.UNSIGNED },
    loanDate:     { type: DataTypes.DATEONLY, allowNull: false },
    dueDate:      { type: DataTypes.DATEONLY, allowNull: false },
    returnDate:   { type: DataTypes.DATEONLY },
    status:       { type: DataTypes.ENUM('active','returned','overdue','lost'), allowNull: false, defaultValue: 'active' },
    lateFee:      { type: DataTypes.DECIMAL(6,2), allowNull: false, defaultValue: 0 },
    conditionOut: { type: DataTypes.ENUM('neuf','bon','acceptable','abime'), defaultValue: 'bon' },
    conditionIn:  { type: DataTypes.ENUM('neuf','bon','acceptable','abime') },
    managedBy:    { type: DataTypes.INTEGER.UNSIGNED },
    notes:        { type: DataTypes.STRING(300) },
  }, { tableName: 'book_loans', underscored: true, timestamps: true });

  BookLoan.associate = (db) => {
    BookLoan.belongsTo(db.Book,    { foreignKey: 'bookId',     as: 'book' });
    BookLoan.belongsTo(db.Student, { foreignKey: 'studentId',  as: 'student' });
    BookLoan.belongsTo(db.User,    { foreignKey: 'userId',     as: 'user' });
    BookLoan.belongsTo(db.User,    { foreignKey: 'managedBy',  as: 'manager' });
  };
  return BookLoan;
};
