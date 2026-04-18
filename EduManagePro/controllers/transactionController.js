'use strict';
const transactionService  = require('../services/transactionService');
const BaseController = require('./BaseController');

class TransactionController extends BaseController {
  constructor() {
    super(transactionService);
  }
}

const ctrl = new TransactionController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
