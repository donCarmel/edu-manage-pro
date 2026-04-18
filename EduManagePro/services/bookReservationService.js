'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class BookReservationService extends BaseService {
  constructor() {
    super(db.BookReservation, [{ model: db.Book, as: 'book', attributes: ['id','title','author'] }, { model: db.Student, as: 'student', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new BookReservationService();
