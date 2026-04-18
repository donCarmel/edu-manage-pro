'use strict';
const service        = require('../services/teacherQualificationService');
const BaseController = require('./BaseController');
const ApiResponse    = require('../utils/ApiResponse');
const asyncHandler   = require('../utils/asyncHandler');

class TeacherQualificationController extends BaseController {
  constructor() {
    super(service);
    this.getAvailable = asyncHandler(this.getAvailable.bind(this));
  }

  // GET /teacher-qualifications/available?subjectId=1&cycle=SECONDAIRE&hoursNeeded=4&academicYearId=1
  async getAvailable(req, res) {
    const { subjectId, cycle, hoursNeeded = 2, academicYearId } = req.query;
    const teachers = await service.findAvailableTeachers({
      subjectId:      parseInt(subjectId),
      cycle,
      hoursNeeded:    parseInt(hoursNeeded),
      academicYearId: academicYearId ? parseInt(academicYearId) : null,
    });
    return ApiResponse.success(res, {
      teachers,
      total:     teachers.length,
      available: teachers.filter(t => t.canTake).length,
      full:      teachers.filter(t => !t.canTake).length,
    });
  }
}

const ctrl = new TeacherQualificationController();
exports.getAll       = ctrl.getAll;
exports.getOne       = ctrl.getOne;
exports.create       = ctrl.create;
exports.update       = ctrl.update;
exports.remove       = ctrl.remove;
exports.getAvailable = ctrl.getAvailable;
