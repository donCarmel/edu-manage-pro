'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class LeaveService extends BaseService {
  constructor() {
    super(db.Leave, [{ model: db.Employee, as: 'employee', include: [{ model: db.User, as: 'user', attributes: ['id','firstName','lastName'] }] }]);
  }
}

module.exports = new LeaveService();
