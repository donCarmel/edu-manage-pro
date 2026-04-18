'use strict';
const gradeService  = require('../services/gradeService');
const BaseController = require('./BaseController');

class GradeController extends BaseController {
  constructor() {
    super(gradeService);
  }
}

const ctrl = new GradeController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
