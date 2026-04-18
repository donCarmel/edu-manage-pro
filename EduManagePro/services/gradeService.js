'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class GradeService extends BaseService {
  constructor() {
    super(db.Grade, [{ model: db.Exam, as: 'exam' }, { model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }]);
  }
}

module.exports = new GradeService();
