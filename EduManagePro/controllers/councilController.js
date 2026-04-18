'use strict';
const councilService  = require('../services/councilService');
const BaseController = require('./BaseController');

class CouncilController extends BaseController {
  constructor() {
    super(councilService);
  }
}

const ctrl = new CouncilController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
