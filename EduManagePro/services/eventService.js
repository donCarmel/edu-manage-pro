'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class EventService extends BaseService {
  constructor() {
    super(db.Event, [{ model: db.AcademicYear, as: 'academicYear' }, { model: db.User, as: 'organizer', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new EventService();
