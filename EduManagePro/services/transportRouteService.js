'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class TransportRouteService extends BaseService {
  constructor() {
    super(db.TransportRoute, []);
  }
}

module.exports = new TransportRouteService();
