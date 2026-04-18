'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class RoomService extends BaseService {
  constructor() {
    super(db.Room, []);
  }
}

module.exports = new RoomService();
