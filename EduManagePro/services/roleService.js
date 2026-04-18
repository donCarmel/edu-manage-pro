'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class RoleService extends BaseService {
  constructor() {
    super(db.Role, []);
  }
}

module.exports = new RoleService();
