'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class MessageService extends BaseService {
  constructor() {
    super(db.Message, [{ model: db.User, as: 'sender', attributes: ['id','firstName','lastName','avatarUrl'] }, { model: db.User, as: 'recipient', required: false, attributes: ['id','firstName','lastName'] }]);
  }
}

module.exports = new MessageService();
