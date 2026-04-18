'use strict';
const eventService  = require('../services/eventService');
const BaseController = require('./BaseController');

class EventController extends BaseController {
  constructor() {
    super(eventService);
  }
}

const ctrl = new EventController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
