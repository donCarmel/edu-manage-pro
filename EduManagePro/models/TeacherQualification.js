'use strict';

/*
 * Modèle : TeacherQualification
 * Table  : teacher_qualifications
 *
 * Représente la qualification d'un enseignant pour une matière donnée
 * avec les cycles autorisés et le quota d'heures hebdomadaires.
 */

module.exports = (sequelize, DataTypes) => {
  const TeacherQualification = sequelize.define('TeacherQualification', {

    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },

    employeeId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    subjectId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // ["PRIMAIRE"] | ["SECONDAIRE"] | ["HUMANITES"] | ["SECONDAIRE","HUMANITES"]
    cycles: {
      type:      DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidCycles(val) {
          const valid = ['PRIMAIRE', 'SECONDAIRE', 'HUMANITES'];
          if (!Array.isArray(val) || val.length === 0)
            throw new Error('cycles doit être un tableau non vide');
          for (const c of val) {
            if (!valid.includes(c))
              throw new Error(`Cycle invalide: ${c}. Valeurs: PRIMAIRE, SECONDAIRE, HUMANITES`);
          }
        },
      },
    },

    maxHoursWeek: {
      type:         DataTypes.TINYINT.UNSIGNED,
      allowNull:    false,
      defaultValue: 18,
      validate:     { min: 1, max: 40 },
    },

    expertiseLevel: {
      type:         DataTypes.ENUM('debutant', 'confirme', 'expert'),
      allowNull:    false,
      defaultValue: 'confirme',
    },

    isActive: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: true,
    },

    notes: {
      type: DataTypes.TEXT,
    },

  }, {
    tableName:   'teacher_qualifications',
    underscored: true,
    timestamps:  true,
  });

  TeacherQualification.associate = (db) => {
    TeacherQualification.belongsTo(db.Employee, {
      foreignKey: 'employeeId',
      as:         'employee',
    });
    TeacherQualification.belongsTo(db.Subject, {
      foreignKey: 'subjectId',
      as:         'subject',
    });
  };

  return TeacherQualification;
};
