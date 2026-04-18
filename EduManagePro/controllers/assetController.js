'use strict';
const assetService  = require('../services/assetService');
const BaseController = require('./BaseController');

class AssetController extends BaseController {
  constructor() {
    super(assetService);
  }
}

const ctrl = new AssetController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.create = ctrl.create;
exports.update = ctrl.update;
exports.remove = ctrl.remove;
