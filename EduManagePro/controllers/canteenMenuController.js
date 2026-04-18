'use strict';
const canteenMenuService  = require('../services/canteenMenuService');
const BaseController = require('./BaseController');

class CanteenMenuController extends BaseController {
  constructor() {
    super(canteenMenuService);
  }
}

const ctrl = new CanteenMenuController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
