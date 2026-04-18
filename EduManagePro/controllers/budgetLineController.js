'use strict';
const budgetLineService  = require('../services/budgetLineService');
const BaseController = require('./BaseController');

class BudgetLineController extends BaseController {
  constructor() {
    super(budgetLineService);
  }
}

const ctrl = new BudgetLineController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
