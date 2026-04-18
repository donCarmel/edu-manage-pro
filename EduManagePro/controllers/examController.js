'use strict';
const examService  = require('../services/examService');
const BaseController = require('./BaseController');

class ExamController extends BaseController {
  constructor() {
    super(examService);
  }
}

const ctrl = new ExamController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
