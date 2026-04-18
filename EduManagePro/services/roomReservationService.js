'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class RoomReservationService extends BaseService {
  constructor() {
    super(db.RoomReservation, [{ model: db.Room, as: 'room', attributes: ['id','name','type','capacity'] }, { model: db.User, as: 'requester', attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new RoomReservationService();
