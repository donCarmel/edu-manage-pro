'use strict';
const bookReservationService  = require('../services/bookReservationService');
const BaseController = require('./BaseController');

class BookReservationController extends BaseController {
  constructor() {
    super(bookReservationService);
  }
}

const ctrl = new BookReservationController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
