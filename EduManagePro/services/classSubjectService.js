'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ClassSubjectService extends BaseService {
  constructor() {
    super(db.ClassSubject, [{ model: db.Class, as: 'class' }, { model: db.Subject, as: 'subject' }, { model: db.User, as: 'teacher', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new ClassSubjectService();
