'use strict';
const classSubjectService  = require('../services/classSubjectService');
const BaseController = require('./BaseController');

class ClassSubjectController extends BaseController {
  constructor() {
    super(classSubjectService);
  }
}

const ctrl = new ClassSubjectController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
