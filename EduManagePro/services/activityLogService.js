'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ActivityLogService extends BaseService {
  constructor() {
    super(db.ActivityLog, [{ model: db.User, as: 'user', attributes: ['id','firstName','lastName','email'] }]);
  }
}

module.exports = new ActivityLogService();
