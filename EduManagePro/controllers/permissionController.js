'use strict';
const permissionService  = require('../services/permissionService');
const BaseController = require('./BaseController');

class PermissionController extends BaseController {
  constructor() {
    super(permissionService);
  }
}

const ctrl = new PermissionController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
