'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class JobPostingService extends BaseService {
  constructor() {
    super(db.JobPosting, []);
  }
}

module.exports = new JobPostingService();
