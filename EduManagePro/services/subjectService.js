'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class SubjectService extends BaseService {
  constructor() {
    super(db.Subject, []);
  }
}

module.exports = new SubjectService();
