'use strict'
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    city: {
      type: DataTypes.STRING,
      unique: true
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {})
  city.associate = (models) => {
    // associations can be defined here
    city.belongsTo(models.country, {
      foreignKey: 'countryId',
      onDelete: 'CASCADE'
    })
    city.hasMany(models.employee, {
      foreignKey: 'cityId',
      onDelete: 'SET NULL'
    })
  }
  return city
}
