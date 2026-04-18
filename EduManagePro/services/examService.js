'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ExamService extends BaseService {
  constructor() {
    super(db.Exam, [{ model: db.ClassSubject, as: 'classSubject', include: [{ model: db.Class, as: 'class' }, { model: db.Subject, as: 'subject' }] }, { model: db.Term, as: 'term' }, { model: db.Room, as: 'room', required: false }]);
  }
}

module.exports = new ExamService();
