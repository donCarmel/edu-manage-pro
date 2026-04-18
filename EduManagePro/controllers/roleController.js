'use strict';
const roleService  = require('../services/roleService');
const BaseController = require('./BaseController');

class RoleController extends BaseController {
  constructor() {
    super(roleService);
  }
}

const ctrl = new RoleController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
