'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ClubMemberService extends BaseService {
  constructor() {
    super(db.ClubMember, [{ model: db.Club, as: 'club', attributes: ['id','name'] }, { model: db.Student, as: 'student', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new ClubMemberService();
