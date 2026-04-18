'use strict';
const clubMemberService  = require('../services/clubMemberService');
const BaseController = require('./BaseController');

class ClubMemberController extends BaseController {
  constructor() {
    super(clubMemberService);
  }
}

const ctrl = new ClubMemberController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
