'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class EmployeeService extends BaseService {
  constructor() {
    super(db.Employee, [{ model: db.User, as: 'user', attributes: ['id','firstName','lastName','email','phone','status'] }]);
  }
}

module.exports = new EmployeeService();
