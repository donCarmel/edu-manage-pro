'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportCard = sequelize.define('ReportCard', {
    id:                  { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    studentId:           { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    termId:              { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    generalAverage:      { type: DataTypes.DECIMAL(5,2) },
    classRank:           { type: DataTypes.SMALLINT.UNSIGNED },
    classTotal:          { type: DataTypes.SMALLINT.UNSIGNED },
    headTeacherComment:  { type: DataTypes.TEXT },
    principalComment:    { type: DataTypes.TEXT },
    councilDecision:     { type: DataTypes.ENUM('passage','redoublement','orientation','felicitations','encouragements','avertissement','tableau_honneur') },
    isPublished:         { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    publishedAt:         { type: DataTypes.DATE },
    generatedBy:         { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'report_cards', underscored: true, timestamps: true });

  ReportCard.associate = (db) => {
    ReportCard.belongsTo(db.Student, { foreignKey: 'studentId',  as: 'student' });
    ReportCard.belongsTo(db.Term,    { foreignKey: 'termId',     as: 'term' });
    ReportCard.belongsTo(db.User,    { foreignKey: 'generatedBy', as: 'generatedByUser' });
  };
  return ReportCard;
};
