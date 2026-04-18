'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class HealthRecordService extends BaseService {
  constructor() {
    super(db.HealthRecord, [{ model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }]);
  }
}

module.exports = new HealthRecordService();
