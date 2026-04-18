'use strict';
const activityLogService  = require('../services/activityLogService');
const BaseController = require('./BaseController');

class ActivityLogController extends BaseController {
  constructor() {
    super(activityLogService);
  }
}

const ctrl = new ActivityLogController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
