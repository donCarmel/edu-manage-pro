'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class InfirmaryVisitService extends BaseService {
  constructor() {
    super(db.InfirmaryVisit, [{ model: db.Student, as: 'student', attributes: ['id','firstName','lastName','studentCode'] }]);
  }
}

module.exports = new InfirmaryVisitService();
