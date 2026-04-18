'use strict';
const infirmaryVisitService  = require('../services/infirmaryVisitService');
const BaseController = require('./BaseController');

class InfirmaryVisitController extends BaseController {
  constructor() {
    super(infirmaryVisitService);
  }
}

const ctrl = new InfirmaryVisitController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
