'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class CouncilService extends BaseService {
  constructor() {
    super(db.Council, [{ model: db.Class, as: 'class' }, { model: db.Term, as: 'term' }]);
  }
}

module.exports = new CouncilService();
