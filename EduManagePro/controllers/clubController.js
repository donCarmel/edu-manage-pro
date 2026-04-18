'use strict';
const clubService  = require('../services/clubService');
const BaseController = require('./BaseController');

class ClubController extends BaseController {
  constructor() {
    super(clubService);
  }
}

const ctrl = new ClubController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
