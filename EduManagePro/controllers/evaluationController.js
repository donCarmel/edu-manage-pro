'use strict';
const evaluationService  = require('../services/evaluationService');
const BaseController = require('./BaseController');

class EvaluationController extends BaseController {
  constructor() {
    super(evaluationService);
  }
}

const ctrl = new EvaluationController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
