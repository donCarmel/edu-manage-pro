'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ClubService extends BaseService {
  constructor() {
    super(db.Club, [{ model: db.User, as: 'supervisor', attributes: ['id','firstName','lastName'] }, { model: db.AcademicYear, as: 'academicYear' }]);
  }
}

module.exports = new ClubService();
