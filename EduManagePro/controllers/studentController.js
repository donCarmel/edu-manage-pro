'use strict';
const studentService  = require('../services/studentService');
const BaseController = require('./BaseController');

class StudentController extends BaseController {
  constructor() {
    super(studentService);
  }
}

const ctrl = new StudentController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
