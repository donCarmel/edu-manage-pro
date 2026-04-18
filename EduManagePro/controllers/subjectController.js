'use strict';
const subjectService  = require('../services/subjectService');
const BaseController = require('./BaseController');

class SubjectController extends BaseController {
  constructor() {
    super(subjectService);
  }
}

const ctrl = new SubjectController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
