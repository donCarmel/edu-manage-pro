'use strict';
const canteenSubscriptionService  = require('../services/canteenSubscriptionService');
const BaseController = require('./BaseController');

class CanteenSubscriptionController extends BaseController {
  constructor() {
    super(canteenSubscriptionService);
  }
}

const ctrl = new CanteenSubscriptionController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
