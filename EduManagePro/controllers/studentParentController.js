"use strict";
const studentParentService = require("../services/studentParentService");
const BaseController = require("./BaseController");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

class StudentParentController extends BaseController {
  constructor() {
    super(studentParentService);

    this.linkParents = asyncHandler(this.linkParents.bind(this));
    this.getParentsOfStudent = asyncHandler(
      this.getParentsOfStudent.bind(this),
    );
    this.getStudentsOfParent = asyncHandler(
      this.getStudentsOfParent.bind(this),
    );
    this.updateLink = asyncHandler(this.updateLink.bind(this));
    this.unlinkParent = asyncHandler(this.unlinkParent.bind(this));
  }

  // POST /api/v1/students/:studentId/parents
  async linkParents(req, res) {
    const parents = Array.isArray(req.body) ? req.body : [req.body];
    if (!parents.length)
      return ApiResponse.error(res, "Aucun parent fourni", 400);

    const student = await this.service.linkParents(
      req.params.studentId,
      parents,
    );
    return ApiResponse.created(
      res,
      student,
      "Parent(s) associé(s) avec succès",
    );
  }

  // GET /api/v1/students/:studentId/parents
  async getParentsOfStudent(req, res) {
    const student = await this.service.getParentsOfStudent(
      req.params.studentId,
    );
    return ApiResponse.success(res, student);
  }

  // GET /api/v1/parents/:parentId/students
  async getStudentsOfParent(req, res) {
    const parent = await this.service.getStudentsOfParent(req.params.parentId);
    return ApiResponse.success(res, parent);
  }

  // PATCH /api/v1/students/:studentId/parents/:parentId
  async updateLink(req, res) {
    const { isPrimary } = req.body;
    if (typeof isPrimary !== "boolean")
      return ApiResponse.error(res, "isPrimary doit être un booléen", 400);

    const link = await this.service.updateLink(
      req.params.studentId,
      req.params.parentId,
      isPrimary,
    );
    return ApiResponse.success(res, link, "Association mise à jour");
  }

  // DELETE /api/v1/students/:studentId/parents/:parentId
  async unlinkParent(req, res) {
    await this.service.unlinkParent(req.params.studentId, req.params.parentId);
    return ApiResponse.success(res, null, "Association supprimée avec succès");
  }
}

module.exports = new StudentParentController();
