'use strict';
const parentMeetingService  = require('../services/parentMeetingService');
const BaseController = require('./BaseController');

class ParentMeetingController extends BaseController {
  constructor() {
    super(parentMeetingService);
  }
}

const ctrl = new ParentMeetingController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
