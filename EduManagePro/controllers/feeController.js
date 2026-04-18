'use strict';
const feeService  = require('../services/feeService');
const BaseController = require('./BaseController');

class FeeController extends BaseController {
  constructor() {
    super(feeService);
  }
}

const ctrl = new FeeController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
