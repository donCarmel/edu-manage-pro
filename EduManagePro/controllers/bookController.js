'use strict';
const bookService  = require('../services/bookService');
const BaseController = require('./BaseController');

class BookController extends BaseController {
  constructor() {
    super(bookService);
  }
}

const ctrl = new BookController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
