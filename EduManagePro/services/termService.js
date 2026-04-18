'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class TermService extends BaseService {
  constructor() {
    super(db.Term, [{ model: db.AcademicYear, as: 'academicYear' }]);
  }
}

module.exports = new TermService();
