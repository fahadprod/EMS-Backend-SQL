'use strict'
module.exports = (sequelize, DataTypes) => {
  const empSkill = sequelize.define('empSkill', {
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
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    }
  }, {})
  empSkill.associate = (models) => {
    // associations can be defined here
    empSkill.belongsTo(models.employee, { foreignKey: 'employeeId' })
    empSkill.belongsTo(models.skill, { foreignKey: 'skillId' })
  }
  return empSkill
}
