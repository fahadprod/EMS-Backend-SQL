'use strict'
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    country: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  country.associate = (models) => {
    // associations can be defined here
    country.hasMany(models.employee, {
      foreignKey: 'countryId',
      onDelete: 'SET NULL'
    })
    country.hasMany(models.city, {
      foreignKey: 'countryId',
      onDelete: 'CASCADE'
    })
  }
  return country
}
