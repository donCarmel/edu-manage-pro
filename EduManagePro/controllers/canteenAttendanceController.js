'use strict';
const canteenAttendanceService  = require('../services/canteenAttendanceService');
const BaseController = require('./BaseController');

class CanteenAttendanceController extends BaseController {
  constructor() {
    super(canteenAttendanceService);
  }
}

const ctrl = new CanteenAttendanceController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
