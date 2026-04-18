'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class BookLoanService extends BaseService {
  constructor() {
    super(db.BookLoan, [{ model: db.Book, as: 'book', attributes: ['id','title','author','isbn'] }, { model: db.Student, as: 'student', required: false, attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new BookLoanService();
