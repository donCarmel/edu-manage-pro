'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class CanteenMenuService extends BaseService {
  constructor() {
    super(db.CanteenMenu, []);
  }
}

module.exports = new CanteenMenuService();
