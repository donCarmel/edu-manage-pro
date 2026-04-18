'use strict';
const leaveService  = require('../services/leaveService');
const BaseController = require('./BaseController');

class LeaveController extends BaseController {
  constructor() {
    super(leaveService);
  }
}

const ctrl = new LeaveController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
