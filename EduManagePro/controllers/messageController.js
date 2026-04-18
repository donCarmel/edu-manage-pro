'use strict';
const messageService  = require('../services/messageService');
const BaseController = require('./BaseController');

class MessageController extends BaseController {
  constructor() {
    super(messageService);
  }
}

const ctrl = new MessageController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
