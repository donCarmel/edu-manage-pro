'use strict';

/*
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║           TABLE : teacher_qualifications                            ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║  Lie un enseignant (employee) à une matière (subject)               ║
 * ║  avec les cycles autorisés et son quota d'heures hebdo              ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Exemple :
 *   employeeId=2, subjectId=1 (Maths), cycles=["SECONDAIRE","HUMANITES"]
 *   maxHoursWeek=18
 *   → Jean Dupont peut enseigner les Maths en Secondaire et Humanités
 *     jusqu'à 18h par semaine
 */

module.exports = {
  up: async (qi, Sequelize) => {

    await qi.createTable('teacher_qualifications', {

      id: {
        type:          Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey:    true,
      },

      // ── Enseignant ────────────────────────────────────────────────────
      employee_id: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        references: { model: 'employees', key: 'id' },
        onUpdate:   'CASCADE',
        onDelete:   'CASCADE',
        comment:    'Référence vers la table employees',
      },

      // ── Matière ───────────────────────────────────────────────────────
      subject_id: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        references: { model: 'subjects', key: 'id' },
        onUpdate:   'CASCADE',
        onDelete:   'CASCADE',
        comment:    'Matière que l enseignant est qualifié pour enseigner',
      },

      // ── Cycles autorisés ──────────────────────────────────────────────
      // JSON array : ["PRIMAIRE"] | ["SECONDAIRE"] | ["HUMANITES"]
      //            | ["PRIMAIRE","SECONDAIRE"] | etc.
      cycles: {
        type:      Sequelize.JSON,
        allowNull: false,
        comment:   'Cycles autorisés ex: ["SECONDAIRE","HUMANITES"]',
      },

      // ── Quota horaire hebdomadaire maximum ────────────────────────────
      max_hours_week: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: 18,
        comment:      'Nombre max d heures/semaine (norme nationale = 18)',
      },

      // ── Niveau d'expertise (pour trier les suggestions) ───────────────
      expertise_level: {
        type:         Sequelize.ENUM('debutant', 'confirme', 'expert'),
        allowNull:    false,
        defaultValue: 'confirme',
        comment:      'Niveau de maîtrise de la matière',
      },

      // ── Actif / inactif ───────────────────────────────────────────────
      is_active: {
        type:         Sequelize.BOOLEAN,
        allowNull:    false,
        defaultValue: true,
        comment:      'Peut être désactivé temporairement',
      },

      // ── Notes ─────────────────────────────────────────────────────────
      notes: {
        type:    Sequelize.TEXT,
        comment: 'Remarques sur la qualification (diplômes, certifications…)',
      },

      created_at: {
        type:         Sequelize.DATE,
        allowNull:    false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type:         Sequelize.DATE,
        allowNull:    false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // ── Index ─────────────────────────────────────────────────────────────
    // Un prof ne peut avoir qu'une seule qualification par matière
    await qi.addIndex('teacher_qualifications',
      ['employee_id', 'subject_id'],
      { unique: true, name: 'uq_teacher_subject' }
    );

    await qi.addIndex('teacher_qualifications',
      ['subject_id'],
      { name: 'idx_tq_subject' }
    );

    await qi.addIndex('teacher_qualifications',
      ['is_active'],
      { name: 'idx_tq_active' }
    );
  },

  down: async (qi) => {
    await qi.dropTable('teacher_qualifications');
  },
};
