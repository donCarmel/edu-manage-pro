'use strict';
const roomReservationService  = require('../services/roomReservationService');
const BaseController = require('./BaseController');

class RoomReservationController extends BaseController {
  constructor() {
    super(roomReservationService);
  }
}

const ctrl = new RoomReservationController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
