'use strict';
const scheduleService  = require('../services/scheduleService');
const BaseController = require('./BaseController');

class ScheduleController extends BaseController {
  constructor() {
    super(scheduleService);
  }
}

const ctrl = new ScheduleController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
