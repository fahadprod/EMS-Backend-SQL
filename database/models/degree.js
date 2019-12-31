'use strict'
module.exports = (sequelize, DataTypes) => {
  const degree = sequelize.define('degree', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    degreeLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    degreeName: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  degree.associate = (models) => {
    // associations can be defined here
    degree.belongsTo(models.degreeLevel, { foreignKey: 'degreeLevelId', onDelete: 'CASCADE' })
    degree.belongsToMany(models.employee, { through: { model: 'empDegree', unique: false }, foreignKey: 'degreeId' })
  }
  return degree
}
