'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class CouncilDecisionService extends BaseService {
  constructor() {
    super(db.CouncilDecision, [{ model: db.Council, as: 'council' }, { model: db.Student, as: 'student', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new CouncilDecisionService();
