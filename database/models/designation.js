'use strict'
module.exports = (sequelize, DataTypes) => {
  const designation = sequelize.define('designation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    designation: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  designation.associate = (models) => {
    // associations can be defined here
    designation.hasMany(models.employee, {
      foreignKey: 'designationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
  return designation
}
