'use strict';
const { Op } = require('sequelize');
const db      = require('../models');
const BaseService = require('./BaseService');

class TeacherQualificationService extends BaseService {
  constructor() {
    super(db.TeacherQualification, [
      {
        model:      db.Employee,
        as:         'employee',
        attributes: ['id', 'employeeCode', 'position', 'status'],
        include: [{
          model:      db.User,
          as:         'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        }],
      },
      {
        model:      db.Subject,
        as:         'subject',
        attributes: ['id', 'name', 'shortCode', 'coefficient'],
      },
    ]);
  }

  // ── GET /teacher-qualifications/available ─────────────────────────────
  // Trouve les profs disponibles pour une matière + cycle + heures données
  async findAvailableTeachers({ subjectId, cycle, hoursNeeded = 2, academicYearId }) {
    if (!subjectId || !cycle) {
      throw Object.assign(
        new Error('subjectId et cycle sont obligatoires'),
        { statusCode: 422 }
      );
    }

    // 1. Récupérer les qualifications actives pour cette matière + cycle
    const qualifications = await db.TeacherQualification.findAll({
      where: {
        subjectId,
        isActive: true,
        cycles:   { [Op.like]: `%${cycle}%` }, // JSON contains cycle
      },
      include: [{
        model:      db.Employee,
        as:         'employee',
        where:      { status: 'active' },
        attributes: ['id', 'employeeCode', 'position', 'status'],
        include: [{
          model:      db.User,
          as:         'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        }],
      }],
    });

    if (qualifications.length === 0) return [];

    // 2. Pour chaque prof qualifié, calculer ses heures actuelles
    const results = await Promise.all(
      qualifications.map(async (qual) => {
        const emp = qual.employee;

        // Compter les heures déjà assignées (via class_subjects → userId)
        const currentHours = await db.ClassSubject.sum('hoursWeek', {
          where: { teacherId: emp.userId },
          include: academicYearId ? [{
            model:    db.Class,
            as:       'class',
            where:    { academicYearId },
            required: true,
          }] : [],
        }) || 0;

        const remaining = emp.maxHoursWeek - currentHours;
        const canTake   = remaining >= hoursNeeded;

        return {
          qualificationId:  qual.id,
          employeeId:       emp.id,
          userId:           emp.userId,
          employeeCode:     emp.employeeCode,
          firstName:        emp.user?.firstName,
          lastName:         emp.user?.lastName,
          email:            emp.user?.email,
          expertiseLevel:   qual.expertiseLevel,
          maxHoursWeek:     emp.maxHoursWeek,
          currentHours,
          remainingHours:   remaining,
          hoursNeeded:      parseInt(hoursNeeded),
          canTake,
          // Message affiché dans le select
          label: `${emp.user?.firstName} ${emp.user?.lastName} — ${emp.employeeCode} | ${currentHours}h/${emp.maxHoursWeek}h${canTake ? '' : ' ⛔ Quota dépassé'}`,
        };
      })
    );

    // Trier : disponibles en premier, puis par heures restantes décroissant
    return results.sort((a, b) => {
      if (a.canTake && !b.canTake) return -1;
      if (!a.canTake && b.canTake) return  1;
      return b.remainingHours - a.remainingHours;
    });
  }
}

module.exports = new TeacherQualificationService();
