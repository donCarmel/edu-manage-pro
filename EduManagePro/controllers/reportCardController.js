'use strict';
const reportCardService  = require('../services/reportCardService');
const BaseController = require('./BaseController');

class ReportCardController extends BaseController {
  constructor() {
    super(reportCardService);
  }
}

const ctrl = new ReportCardController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
