'use strict'
module.exports = (sequelize, DataTypes) => {
  const empWorkExperience = sequelize.define('empWorkExperience', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    employeeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    startYear: {
      type: DataTypes.DATE
    },
    endYear: {
      type: DataTypes.DATE
    },
    company: {
      type: DataTypes.STRING(100)
    },
    jobDescription: {
      type: DataTypes.STRING(255)
    },
    designation: {
      type: DataTypes.STRING(50)
    }
  }, {})
  empWorkExperience.associate = (models) => {
    // associations can be defined here
    empWorkExperience.belongsTo(models.employee, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
  return empWorkExperience
}
