'use strict';
const { Op } = require('sequelize');
const db          = require('../models');
const BaseService = require('./BaseService');

class TeacherService extends BaseService {
  constructor() {
    // Base : employees avec position = 'Enseignant'
    super(db.Employee, [
      {
        model:      db.User,
        as:         'user',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'status'],
      },
    ]);
  }

  // ── GET /teachers  →  tous les enseignants ──────────────────────────────
  async findAll(query = {}) {
    const { page = 1, limit = 50 } = query;
    const offset = (page - 1) * limit;

    const { rows, count } = await db.Employee.findAndCountAll({
      where: {
        position: { [Op.like]: '%nseignant%' }, // Enseignant / enseignant
        status:   'active',
      },
      include: [
        {
          model:      db.User,
          as:         'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'status'],
        },
      ],
      limit:    parseInt(limit),
      offset:   parseInt(offset),
      order:    [['id', 'ASC']],
      distinct: true,
    });

    return { rows, count, page: parseInt(page), limit: parseInt(limit) };
  }

  // ── GET /teachers/:id/classes  →  classes d'un enseignant ──────────────
  async findClassesByTeacher(employeeId) {
    const employee = await db.Employee.findByPk(employeeId, {
      include: [
        {
          model:      db.User,
          as:         'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model:   db.Class,
          as:      'assignedClasses',       // via TeacherClass (belongsToMany)
          include: [
            { model: db.AcademicYear, as: 'academicYear', attributes: ['id', 'label', 'isCurrent'] },
            { model: db.Room,         as: 'room',         attributes: ['id', 'name', 'type'], required: false },
          ],
          through: { attributes: ['isPrimary'] },  // champ dans teacher_classes
        },
      ],
    });

    if (!employee) {
      throw Object.assign(new Error('Enseignant introuvable'), { statusCode: 404 });
    }

    return employee;
  }

  // ── GET /teachers/:id  →  un enseignant avec ses matières ──────────────
  async findById(id) {
    const employee = await db.Employee.findByPk(id, {
      include: [
        {
          model:      db.User,
          as:         'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'status'],
        },
        {
          model:   db.Class,
          as:      'assignedClasses',
          include: [
            { model: db.AcademicYear, as: 'academicYear', attributes: ['id', 'label', 'isCurrent'] },
          ],
          through: { attributes: ['isPrimary'] },
          required: false,
        },
      ],
    });

    if (!employee) {
      throw Object.assign(new Error('Enseignant introuvable'), { statusCode: 404 });
    }

    return employee;
  }
}

module.exports = new TeacherService();
