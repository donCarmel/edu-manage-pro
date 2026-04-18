'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class CanteenSubscriptionService extends BaseService {
  constructor() {
    super(db.CanteenSubscription, [{ model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }, { model: db.AcademicYear, as: 'academicYear' }]);
  }
}

module.exports = new CanteenSubscriptionService();
