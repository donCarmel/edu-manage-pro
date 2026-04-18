'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class BookService extends BaseService {
  constructor() {
    super(db.Book, []);
  }
}

module.exports = new BookService();
