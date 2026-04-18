'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class FeePaymentService extends BaseService {
  constructor() {
    super(db.FeePayment, [{ model: db.Fee, as: 'fee' }, { model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }]);
  }
}

module.exports = new FeePaymentService();
