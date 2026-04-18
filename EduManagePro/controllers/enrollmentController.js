'use strict';
const enrollmentService  = require('../services/enrollmentService');
const BaseController = require('./BaseController');

class EnrollmentController extends BaseController {
  constructor() {
    super(enrollmentService);
  }
}

const ctrl = new EnrollmentController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
