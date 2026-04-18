'use strict';
const attendanceService  = require('../services/attendanceService');
const BaseController = require('./BaseController');

class AttendanceController extends BaseController {
  constructor() {
    super(attendanceService);
  }
}

const ctrl = new AttendanceController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
