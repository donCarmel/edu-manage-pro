'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class AttendanceService extends BaseService {
  constructor() {
    super(db.Attendance, [{ model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }, { model: db.Class, as: 'class', attributes: ['id','name','level'] }]);
  }
}

module.exports = new AttendanceService();
