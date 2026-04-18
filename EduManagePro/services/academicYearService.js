'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class AcademicYearService extends BaseService {
  constructor() {
    super(db.AcademicYear, []);
  }
}

module.exports = new AcademicYearService();
