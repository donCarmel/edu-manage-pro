"use strict";
const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const BaseService = require("./BaseService");

class TeacherQualificationService extends BaseService {
  constructor() {
    super(db.TeacherQualification, [
      {
        model: db.Employee,
        as: "employee",
        attributes: ["id", "employeeCode", "position", "status", "userId"],
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      },
      {
        model: db.Subject,
        as: "subject",
        attributes: ["id", "name", "shortCode", "coefficient"],
      },
    ]);
  }

  // ── GET /teacher-qualifications/available ─────────────────────────────
  async findAvailableTeachers({
    subjectId,
    cycle,
    hoursNeeded = 2,
    academicYearId,
  }) {
    // 🔒 Validation
    if (!subjectId || !cycle) {
      throw Object.assign(new Error("subjectId et cycle sont obligatoires"), {
        statusCode: 422,
      });
    }

    hoursNeeded = parseInt(hoursNeeded) || 2;

    // ─────────────────────────────────────────────────────────────
    // 1. Récupérer les qualifications valides
    // ─────────────────────────────────────────────────────────────
    const qualifications = await db.TeacherQualification.findAll({
      where: {
        subjectId,
        isActive: true,
        [Op.and]: [Sequelize.literal(`JSON_CONTAINS(cycles, '["${cycle}"]')`)],
      },
      include: [
        {
          model: db.Employee,
          as: "employee",
          where: { status: "active" },
          attributes: ["id", "employeeCode", "position", "status", "userId"],
          include: [
            {
              model: db.User,
              as: "user",
              attributes: ["id", "firstName", "lastName", "email"],
            },
          ],
        },
      ],
    });

    if (qualifications.length === 0) return [];

    // ─────────────────────────────────────────────────────────────
    // 2. Calcul des disponibilités
    // ─────────────────────────────────────────────────────────────
    const results = await Promise.all(
      qualifications.map(async (qual) => {
        const emp = qual.employee;

        // 🔢 Heures déjà assignées
        const currentHours =
          (await db.ClassSubject.sum("hoursWeek", {
            where: { teacherId: emp.userId },
            include: academicYearId
              ? [
                  {
                    model: db.Class,
                    as: "class",
                    attributes: [],
                    where: { academicYearId },
                    required: true,
                  },
                ]
              : [],
          })) || 0;

        // ✅ CORRECTION ICI (utiliser qual.maxHoursWeek)
        const maxHoursWeek = qual.maxHoursWeek;
        const remaining = maxHoursWeek - currentHours;
        const canTake = remaining >= hoursNeeded;

        return {
          qualificationId: qual.id,
          employeeId: emp.id,
          userId: emp.userId,
          employeeCode: emp.employeeCode,
          firstName: emp.user?.firstName,
          lastName: emp.user?.lastName,
          email: emp.user?.email,
          expertiseLevel: qual.expertiseLevel,
          maxHoursWeek,
          currentHours,
          remainingHours: remaining,
          hoursNeeded,
          canTake,

          // 🎯 Label pour UI
          label: `${emp.user?.firstName} ${emp.user?.lastName} — ${emp.employeeCode} | ${currentHours}h/${maxHoursWeek}h${canTake ? "" : " ⛔ Quota dépassé"}`,
        };
      }),
    );

    // ─────────────────────────────────────────────────────────────
    // 3. Trier (disponibles en premier)
    // ─────────────────────────────────────────────────────────────
    return results.sort((a, b) => {
      if (a.canTake && !b.canTake) return -1;
      if (!a.canTake && b.canTake) return 1;
      return b.remainingHours - a.remainingHours;
    });
  }
}

module.exports = new TeacherQualificationService();
