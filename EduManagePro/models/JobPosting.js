'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobPosting = sequelize.define('JobPosting', {
    id:           { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title:        { type: DataTypes.STRING(150), allowNull: false },
    department:   { type: DataTypes.STRING(80),  allowNull: false },
    contractType: { type: DataTypes.ENUM('CDI','CDD','vacataire','stage'), allowNull: false },
    description:  { type: DataTypes.TEXT },
    requirements: { type: DataTypes.TEXT },
    status:       { type: DataTypes.ENUM('open','closed','filled'), allowNull: false, defaultValue: 'open' },
    postedAt:     { type: DataTypes.DATEONLY, allowNull: false },
    deadline:     { type: DataTypes.DATEONLY },
    filledBy:     { type: DataTypes.INTEGER.UNSIGNED },
    createdBy:    { type: DataTypes.INTEGER.UNSIGNED },
  }, { tableName: 'job_postings', underscored: true, timestamps: true });

  JobPosting.associate = (db) => {
    JobPosting.belongsTo(db.Employee, { foreignKey: 'filledBy',  as: 'filledByEmployee' });
    JobPosting.belongsTo(db.User,     { foreignKey: 'createdBy', as: 'creator' });
  };
  return JobPosting;
};
