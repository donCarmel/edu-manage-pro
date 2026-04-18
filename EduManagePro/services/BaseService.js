'use strict';
const paginate = require('../utils/paginate');
const { Op }   = require('sequelize');

class BaseService {
  constructor(Model, defaultInclude = []) {
    this.Model          = Model;
    this.defaultInclude = defaultInclude;
  }

  async findAll(query = {}) {
    const { page, limit, offset } = paginate(query);
    const where = this._buildWhere(query);

    const { rows, count } = await this.Model.findAndCountAll({
      where,
      include: this.defaultInclude,
      limit, offset,
      order: [['createdAt', 'DESC']],
      distinct: true,
    });
    return { rows, count, page, limit };
  }

  async findById(id) {
    const record = await this.Model.findByPk(id, { include: this.defaultInclude });
    if (!record) throw Object.assign(new Error('Ressource introuvable'), { statusCode: 404 });
    return record;
  }

  async create(data) {
    return this.Model.create(data);
  }

  async update(id, data) {
    const record = await this.findById(id);
    return record.update(data);
  }

  async delete(id) {
    const record = await this.findById(id);
    await record.destroy();
    return true;
  }

  _buildWhere(query) {
    const where = {};
    const skip  = ['page', 'limit', 'sort', 'order'];
    for (const [key, val] of Object.entries(query)) {
      if (skip.includes(key) || !val) continue;
      where[key] = val;
    }
    return where;
  }
}

module.exports = BaseService;
