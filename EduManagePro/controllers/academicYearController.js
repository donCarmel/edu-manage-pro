'use strict';
const academicYearService  = require('../services/academicYearService');
const BaseController = require('./BaseController');

class AcademicYearController extends BaseController {
  constructor() {
    super(academicYearService);
  }
}

const ctrl = new AcademicYearController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
