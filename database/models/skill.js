'use strict'
module.exports = (sequelize, DataTypes) => {
  const skill = sequelize.define('skill', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    skill: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  skill.associate = (models) => {
    // associations can be defined here
    skill.belongsToMany(models.employee, {
      through: { model: 'empSkill', unique: false },
      foreignKey: 'skillId'
    })
  }
  return skill
}
