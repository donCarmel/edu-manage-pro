'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ParentMeetingService extends BaseService {
  constructor() {
    super(db.ParentMeeting, [{ model: db.Parent, as: 'parent' }, { model: db.Student, as: 'student', attributes: ['id','firstName','lastName'] }, { model: db.User, as: 'teacher', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new ParentMeetingService();
