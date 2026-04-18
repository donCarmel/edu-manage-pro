'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class BudgetLineService extends BaseService {
  constructor() {
    super(db.BudgetLine, [{ model: db.AcademicYear, as: 'academicYear' }]);
  }
}

module.exports = new BudgetLineService();
