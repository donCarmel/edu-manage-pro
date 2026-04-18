'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class MedicalStockService extends BaseService {
  constructor() {
    super(db.MedicalStock, []);
  }
}

module.exports = new MedicalStockService();
