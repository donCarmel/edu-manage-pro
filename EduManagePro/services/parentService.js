'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class ParentService extends BaseService {
  constructor() {
    super(db.Parent, [{ model: db.Student, as: 'students', through: { attributes: ['isPrimary'] }, required: false }]);
  }
}

module.exports = new ParentService();
