'use strict';
const ApiResponse  = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

class BaseController {
  constructor(service) {
    this.service = service;
    this.getAll  = asyncHandler(this.getAll.bind(this));
    this.getOne  = asyncHandler(this.getOne.bind(this));
    this.create  = asyncHandler(this.create.bind(this));
    this.update  = asyncHandler(this.update.bind(this));
    this.remove  = asyncHandler(this.remove.bind(this));
  }

  async getAll(req, res) {
    const { rows, count, page, limit } = await this.service.findAll(req.query);
    return ApiResponse.paginated(res, rows, count, page, limit);
  }

  async getOne(req, res) {
    const record = await this.service.findById(req.params.id);
    return ApiResponse.success(res, record);
  }

  async create(req, res) {
    const record = await this.service.create(req.body);
    return ApiResponse.created(res, record);
  }

  async update(req, res) {
    const record = await this.service.update(req.params.id, req.body);
    return ApiResponse.success(res, record, 'Mis à jour avec succès');
  }

  async remove(req, res) {
    await this.service.delete(req.params.id);
    return ApiResponse.success(res, null, 'Supprimé avec succès');
  }
}

module.exports = BaseController;
