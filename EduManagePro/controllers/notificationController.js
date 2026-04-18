'use strict';
const notificationService  = require('../services/notificationService');
const BaseController = require('./BaseController');

class NotificationController extends BaseController {
  constructor() {
    super(notificationService);
  }
}

const ctrl = new NotificationController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
