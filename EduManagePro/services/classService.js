'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ClassService extends BaseService {
  constructor() {
    super(db.Class, [{ model: db.AcademicYear, as: 'academicYear' }, { model: db.Room, as: 'room', required: false }, { model: db.User, as: 'headTeacher', required: false, attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new ClassService();
