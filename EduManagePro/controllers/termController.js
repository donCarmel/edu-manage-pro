'use strict';
const termService  = require('../services/termService');
const BaseController = require('./BaseController');

class TermController extends BaseController {
  constructor() {
    super(termService);
  }
}

const ctrl = new TermController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
