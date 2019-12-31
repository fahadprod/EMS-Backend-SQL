'use strict'
module.exports = (sequelize, DataTypes) => {
  const gender = sequelize.define('gender', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  gender.associate = (models) => {
    // associations can be defined here
    gender.hasMany(models.employee, {
      foreignKey: 'genderId',
      onDelete: 'SET NULL'
    })
  }
  return gender
}
