'use strict';
const feePaymentService  = require('../services/feePaymentService');
const BaseController = require('./BaseController');

class FeePaymentController extends BaseController {
  constructor() {
    super(feePaymentService);
  }
}

const ctrl = new FeePaymentController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
