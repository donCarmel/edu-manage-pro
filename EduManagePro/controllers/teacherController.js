"use strict";
const teacherService = require("../services/teacherService");
const BaseController = require("./BaseController");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

class TeacherController extends BaseController {
  constructor() {
    super(teacherService);
    // Ajouter la méthode custom pour les classes
    this.getClasses = asyncHandler(this.getClasses.bind(this));
  }

  // GET /teachers/:id/classes
  async getClasses(req, res) {
    const employee = await teacherService.findClassesByTeacher(req.params.id);
    return ApiResponse.success(res, {
      teacher: {
        id: employee.id,
        employeeCode: employee.employeeCode,
        position: employee.position,
        department: employee.department,
        firstName: employee.user?.firstName,
        lastName: employee.user?.lastName,
        email: employee.user?.email,
      },
      classes: employee.assignedClasses || [],
      total: (employee.assignedClasses || []).length,
    });
  }
}

const ctrl = new TeacherController();
exports.getAll = ctrl.getAll;
exports.getOne = ctrl.getOne;
exports.getClasses = ctrl.getClasses;
