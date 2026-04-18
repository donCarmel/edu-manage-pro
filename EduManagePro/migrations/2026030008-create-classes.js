'use strict';
module.exports = {
  up: async (qi, Sequelize) => {

    // ── 1. Créer la table SANS les références FK ───────────────────────────
    await qi.createTable('classes', {
      id: {
        type:          Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey:    true,
      },
      academic_year_id: {
        type:      Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        // PAS de references ici → on les ajoute après
      },
      room_id: {
        type:      Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      head_teacher_id: {
        type:      Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      cycle: {
        type:      Sequelize.ENUM('PRIMAIRE', 'SECONDAIRE', 'HUMANITES'),
        allowNull: false,
      },
      grade_number: {
        type:      Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
      },
      division: {
        type:         Sequelize.CHAR(1),
        allowNull:    false,
        defaultValue: 'A',
      },
      name: {
        type:      Sequelize.STRING(10),
        allowNull: false,
      },
      max_capacity: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: 35,
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

    // ── 2. Index simples ───────────────────────────────────────────────────
    await qi.addIndex('classes', ['academic_year_id'], { name: 'idx_classes_ay' });
    await qi.addIndex('classes', ['cycle'],            { name: 'idx_classes_cycle' });
    await qi.addIndex('classes', ['grade_number'],     { name: 'idx_classes_grade' });

    // ── 3. Index unique (pas deux "7SB" par année) ─────────────────────────
    await qi.addIndex('classes', ['academic_year_id', 'grade_number', 'division'], {
      unique: true,
      name:   'uq_class_year_grade_division',
    });

    // ── 4. Contraintes FK APRÈS la création de la table ────────────────────
    await qi.addConstraint('classes', {
      fields:     ['academic_year_id'],
      type:       'foreign key',
      name:       'fk_classes_academic_year',
      references: { table: 'academic_years', field: 'id' },
      onUpdate:   'CASCADE',
      onDelete:   'RESTRICT',
    });

    await qi.addConstraint('classes', {
      fields:     ['room_id'],
      type:       'foreign key',
      name:       'fk_classes_room',
      references: { table: 'rooms', field: 'id' },
      onUpdate:   'CASCADE',
      onDelete:   'SET NULL',
    });

    await qi.addConstraint('classes', {
      fields:     ['head_teacher_id'],
      type:       'foreign key',
      name:       'fk_classes_head_teacher',
      references: { table: 'users', field: 'id' },
      onUpdate:   'CASCADE',
      onDelete:   'SET NULL',
    });
  },

  down: async (qi) => {
    await qi.dropTable('classes');
  },
};