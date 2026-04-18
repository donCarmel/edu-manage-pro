'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class CanteenAttendanceService extends BaseService {
  constructor() {
    super(db.CanteenAttendance, [{ model: db.Student, as: 'student', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new CanteenAttendanceService();
