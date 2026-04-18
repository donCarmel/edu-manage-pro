'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class UserService extends BaseService {
  constructor() {
    super(db.User, [{ model: db.Role, as: 'role', attributes: ['name','label'] }]);
  }
}

module.exports = new UserService();
