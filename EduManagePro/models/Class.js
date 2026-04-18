"use strict";

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      academicYearId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      //Cycle : PRIMAIRE | SECONDAIRE | HUMANITES
      cycle: {
        type: DataTypes.ENUM("PRIMAIRE", "SECONDAIRE", "HUMANITES"),
        allowNull: false,
        comment: "Cycle scolaire de la classe",
      },

      // Numéro du niveau dans le cycle
      // PRIMAIRE   : 1 → 6
      // SECONDAIRE : 7 → 10
      // HUMANITES  : 11 → 13
      gradeNumber: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
          min: 1,
          max: 13,
        },
        comment:
          "Numéro du niveau (1-6 primaire, 7-10 secondaire, 11-13 humanités)",
      },

      // Division : A, B, C, D … (une lettre par classe d'un même niveau)
      division: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "A",
        validate: {
          isIn: {
            args: [["A", "B", "C", "D", "E", "F"]],
            msg: "La division doit être A, B, C, D, E ou F",
          },
        },
        comment: "Lettre de la division (A, B, C, D…)",
      },

      //Nom complet auto-généré : "1PA", "7SB", "11HC"
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: "Nom complet ex: 1PA, 7SB, 11HC  (généré automatiquement)",
      },

      //Capacité maximale (35 par défaut)
      maxCapacity: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 35,
        validate: { min: 1, max: 60 },
      },

      roomId: { type: DataTypes.INTEGER.UNSIGNED },
      headTeacherId: { type: DataTypes.INTEGER.UNSIGNED },
    },
    {
      tableName: "classes",
      underscored: true,
      timestamps: true,

      indexes: [
        // Une seule classe "7SB" par année académique
        {
          unique: true,
          fields: ["academic_year_id", "grade_number", "division"],
          name: "uq_class_year_grade_division",
        },
      ],

      hooks: {
        //Génère "name" et vérifie la cohérence cycle/gradeNumber
        beforeValidate(instance) {
          const g = instance.gradeNumber;
          const d = instance.division;

          if (!g || !d) return;

          // Forcer le cycle selon le gradeNumber
          if (g >= 1 && g <= 6) instance.cycle = "PRIMAIRE";
          else if (g >= 7 && g <= 10) instance.cycle = "SECONDAIRE";
          else if (g >= 11 && g <= 13) instance.cycle = "HUMANITES";

          // Suffixe selon le cycle : P | S | H
          const suffix =
            {
              PRIMAIRE: "P",
              SECONDAIRE: "S",
              HUMANITES: "H",
            }[instance.cycle] || "";

          // Ex: gradeNumber=7, division="B", cycle=SECONDAIRE → "7SB"
          instance.name = `${g}${suffix}${d}`;
        },
      },
    },
  );

  //Méthode utilitaire : combien de classes pour un niveau donné ?
  Class.countDivisionsNeeded = (totalStudents, maxPerClass = 35) => {
    return Math.ceil(totalStudents / maxPerClass);
    // 120 élèves ÷ 35 = ceil(3.43) = 4 classes → A, B, C, D
  };

  Class.associate = (db) => {
    Class.belongsTo(db.AcademicYear, {
      foreignKey: "academicYearId",
      as: "academicYear",
    });
    Class.belongsTo(db.Room, { foreignKey: "roomId", as: "room" });
    Class.belongsTo(db.User, {
      foreignKey: "headTeacherId",
      as: "headTeacher",
    });
    Class.hasMany(db.Student, { foreignKey: "classId", as: "students" });
    Class.hasMany(db.ClassSubject, {
      foreignKey: "classId",
      as: "classSubjects",
    });
    Class.hasMany(db.Council, { foreignKey: "classId", as: "councils" });
    Class.hasMany(db.Attendance, { foreignKey: "classId", as: "attendance" });
  };

  return Class;
};
