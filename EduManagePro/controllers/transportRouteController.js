'use strict';
const transportRouteService  = require('../services/transportRouteService');
const BaseController = require('./BaseController');

class TransportRouteController extends BaseController {
  constructor() {
    super(transportRouteService);
  }
}

const ctrl = new TransportRouteController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
