'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class NotificationService extends BaseService {
  constructor() {
    super(db.Notification, [{ model: db.User, as: 'sender', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new NotificationService();
