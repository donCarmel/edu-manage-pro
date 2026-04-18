'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class FeeService extends BaseService {
  constructor() {
    super(db.Fee, [{ model: db.AcademicYear, as: 'academicYear' }]);
  }
}

module.exports = new FeeService();
