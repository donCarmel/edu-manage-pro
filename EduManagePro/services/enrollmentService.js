'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class EnrollmentService extends BaseService {
  constructor() {
    super(db.Enrollment, [{ model: db.Student, as: 'student', required: false }, { model: db.AcademicYear, as: 'academicYear' }, { model: db.Class, as: 'class', required: false }]);
  }
}

module.exports = new EnrollmentService();
