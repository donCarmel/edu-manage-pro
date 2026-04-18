'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ScheduleService extends BaseService {
  constructor() {
    super(db.Schedule, [{ model: db.ClassSubject, as: 'classSubject', include: [{ model: db.Class, as: 'class' }, { model: db.Subject, as: 'subject' }] }, { model: db.Room, as: 'room', required: false }]);
  }
}

module.exports = new ScheduleService();
