'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ReportCardService extends BaseService {
  constructor() {
    super(db.ReportCard, [{ model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }, { model: db.Term, as: 'term' }]);
  }
}

module.exports = new ReportCardService();
