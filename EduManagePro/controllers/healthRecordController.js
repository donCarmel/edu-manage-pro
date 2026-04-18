'use strict';
const healthRecordService  = require('../services/healthRecordService');
const BaseController = require('./BaseController');

class HealthRecordController extends BaseController {
  constructor() {
    super(healthRecordService);
  }
}

const ctrl = new HealthRecordController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
