'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class TransactionService extends BaseService {
  constructor() {
    super(db.Transaction, [{ model: db.AcademicYear, as: 'academicYear' }, { model: db.Student, as: 'student', required: false, attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new TransactionService();
