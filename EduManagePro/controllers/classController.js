'use strict';
const classService  = require('../services/classService');
const BaseController = require('./BaseController');

class ClassController extends BaseController {
  constructor() {
    super(classService);
  }
}

const ctrl = new ClassController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
