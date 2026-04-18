'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class EvaluationService extends BaseService {
  constructor() {
    super(db.Evaluation, [{ model: db.Employee, as: 'employee', include: [{ model: db.User, as: 'user', attributes: ['id','firstName','lastName'] }] }, { model: db.AcademicYear, as: 'academicYear' }]);
  }
}

module.exports = new EvaluationService();
