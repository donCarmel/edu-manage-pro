'use strict';
const medicalStockService  = require('../services/medicalStockService');
const BaseController = require('./BaseController');

class MedicalStockController extends BaseController {
  constructor() {
    super(medicalStockService);
  }
}

const ctrl = new MedicalStockController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
