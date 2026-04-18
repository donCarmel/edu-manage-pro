'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class AssetService extends BaseService {
  constructor() {
    super(db.Asset, []);
  }
}

module.exports = new AssetService();
