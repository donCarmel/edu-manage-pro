'use strict';
const jobPostingService  = require('../services/jobPostingService');
const BaseController = require('./BaseController');

class JobPostingController extends BaseController {
  constructor() {
    super(jobPostingService);
  }
}

const ctrl = new JobPostingController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
