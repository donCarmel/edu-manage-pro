'use strict';
const employeeService  = require('../services/employeeService');
const BaseController = require('./BaseController');

class EmployeeController extends BaseController {
  constructor() {
    super(employeeService);
  }
}

const ctrl = new EmployeeController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
