'use strict'
module.exports = (sequelize, DataTypes) => {
  const certification = sequelize.define('certification', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    certification: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  certification.associate = (models) => {
    // associations can be defined here
    certification.belongsToMany(models.employee, { through: { model: 'empCertifications', unique: false }, foreignKey: 'certificationId' })
  }
  return certification
}
