'use strict'
module.exports = (sequelize, DataTypes) => {
  const empCertifications = sequelize.define('empCertifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    certificationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    title: DataTypes.STRING,
    organization: DataTypes.STRING,
    location: DataTypes.STRING,
    completionDate: DataTypes.DATEONLY
  }, {})
  empCertifications.associate = (models) => {
    // associations can be defined here
    empCertifications.belongsTo(models.employee, { foreignKey: 'employeeId' })
    empCertifications.belongsTo(models.certification, { foreignKey: 'certificationId' })
  }
  return empCertifications
}
