'use strict';
const db          = require('../models');
const BaseService = require('./BaseService');

class StudentParentService extends BaseService {
  constructor() {
    super(db.StudentParent, []);
  }

  // ── Associer un ou plusieurs parents à un étudiant ──────────────────────────
  // parents = [{ parentId, isPrimary }] ou { parentId, isPrimary }
  async linkParents(studentId, parents) {
    const parentsArray = Array.isArray(parents) ? parents : [parents];

    const student = await db.Student.findByPk(studentId);
    if (!student) throw Object.assign(new Error('Étudiant introuvable'), { statusCode: 404 });

    const ids    = parentsArray.map((p) => p.parentId);
    const found  = await db.Parent.findAll({ where: { id: ids } });
    if (found.length !== ids.length)
      throw Object.assign(new Error('Un ou plusieurs parents introuvables'), { statusCode: 404 });

    const rows = parentsArray.map((p) => ({
      studentId: parseInt(studentId),
      parentId:  p.parentId,
      isPrimary: p.isPrimary ?? false,
    }));

    await db.StudentParent.bulkCreate(rows, { updateOnDuplicate: ['isPrimary'] });

    return this.getParentsOfStudent(studentId);
  }

  // ── Lister les parents d'un étudiant ────────────────────────────────────────
  async getParentsOfStudent(studentId) {
    const student = await db.Student.findByPk(studentId, {
      include: [{ model: db.Parent, as: 'parents', through: { attributes: ['isPrimary'] } }],
    });
    if (!student) throw Object.assign(new Error('Étudiant introuvable'), { statusCode: 404 });
    return student;
  }

  // ── Lister les étudiants d'un parent ────────────────────────────────────────
  async getStudentsOfParent(parentId) {
    const parent = await db.Parent.findByPk(parentId, {
      include: [{ model: db.Student, as: 'students', through: { attributes: ['isPrimary'] } }],
    });
    if (!parent) throw Object.assign(new Error('Parent introuvable'), { statusCode: 404 });
    return parent;
  }

  // ── Modifier isPrimary d'un lien ─────────────────────────────────────────────
  async updateLink(studentId, parentId, isPrimary) {
    const link = await db.StudentParent.findOne({ where: { studentId, parentId } });
    if (!link) throw Object.assign(new Error('Association introuvable'), { statusCode: 404 });
    return link.update({ isPrimary });
  }

  // ── Dissocier un parent d'un étudiant ───────────────────────────────────────
  async unlinkParent(studentId, parentId) {
    const deleted = await db.StudentParent.destroy({ where: { studentId, parentId } });
    if (!deleted) throw Object.assign(new Error('Association introuvable'), { statusCode: 404 });
    return true;
  }
}

module.exports = new StudentParentService();
