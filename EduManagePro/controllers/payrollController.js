'use strict';
const payrollService  = require('../services/payrollService');
const BaseController = require('./BaseController');

class PayrollController extends BaseController {
  constructor() {
    super(payrollService);
  }
}

const ctrl = new PayrollController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
