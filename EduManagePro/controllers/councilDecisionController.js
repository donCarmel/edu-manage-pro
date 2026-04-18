'use strict';
const councilDecisionService  = require('../services/councilDecisionService');
const BaseController = require('./BaseController');

class CouncilDecisionController extends BaseController {
  constructor() {
    super(councilDecisionService);
  }
}

const ctrl = new CouncilDecisionController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
