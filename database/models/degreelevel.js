'use strict'
module.exports = (sequelize, DataTypes) => {
  const degreeLevel = sequelize.define('degreeLevel', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    degreeLevel: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  degreeLevel.associate = (models) => {
    // associations can be defined here
    degreeLevel.hasMany(models.degree, { foreignKey: 'degreeLevelId', onDelete: 'CASCADE' })
  }
  return degreeLevel
}
