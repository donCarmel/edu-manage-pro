'use strict';
module.exports = (sequelize, DataTypes) => {
  const CouncilDecision = sequelize.define('CouncilDecision', {
    id:                     { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    councilId:              { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId:              { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    generalAverage:         { type: DataTypes.DECIMAL(5,2) },
    classRank:              { type: DataTypes.SMALLINT.UNSIGNED },
    headTeacherAppreciation:{ type: DataTypes.TEXT },
    decision:               { type: DataTypes.ENUM('passage','redoublement','orientation','felicitations','encouragements','avertissement','tableau_honneur') },
    advice:                 { type: DataTypes.TEXT },
  }, { tableName: 'council_decisions', underscored: true, timestamps: true });

  CouncilDecision.associate = (db) => {
    CouncilDecision.belongsTo(db.Council, { foreignKey: 'councilId', as: 'council' });
    CouncilDecision.belongsTo(db.Student, { foreignKey: 'studentId', as: 'student' });
  };
  return CouncilDecision;
};
