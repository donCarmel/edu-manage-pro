'use strict';
const parentService  = require('../services/parentService');
const BaseController = require('./BaseController');

class ParentController extends BaseController {
  constructor() {
    super(parentService);
  }
}

const ctrl = new ParentController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
