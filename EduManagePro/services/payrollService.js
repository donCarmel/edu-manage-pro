'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class PayrollService extends BaseService {
  constructor() {
    super(db.Payroll, [{ model: db.Employee, as: 'employee', include: [{ model: db.User, as: 'user', attributes: ['id','firstName','lastName'] }] }]);
  }
}

module.exports = new PayrollService();
