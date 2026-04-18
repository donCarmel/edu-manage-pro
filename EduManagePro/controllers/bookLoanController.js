'use strict';
const bookLoanService  = require('../services/bookLoanService');
const BaseController = require('./BaseController');

class BookLoanController extends BaseController {
  constructor() {
    super(bookLoanService);
  }
}

const ctrl = new BookLoanController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
