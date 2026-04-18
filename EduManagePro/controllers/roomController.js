'use strict';
const roomService  = require('../services/roomService');
const BaseController = require('./BaseController');

class RoomController extends BaseController {
  constructor() {
    super(roomService);
  }
}

const ctrl = new RoomController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
