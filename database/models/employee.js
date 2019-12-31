'use strict'
var fs = require('fs')
// eslint-disable-next-line no-path-concat

var imageData = fs.readFileSync(process.env.DEFAULT_IMAGE)

module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define('employee', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING(20)
    },
    age: DataTypes.INTEGER,
    genderId: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.BLOB,
      defaultValue: imageData
    },
    address: DataTypes.STRING(100),
    cityId: {
      type: DataTypes.INTEGER
    },
    countryId: {
      type: DataTypes.INTEGER
    },
    description: DataTypes.STRING(256),
    designationId: {
      type: DataTypes.INTEGER
    }
  }, {})
  employee.associate = (models) => {
    // associations can be defined here
    employee.belongsTo(models.city, {
      foreignKey: 'cityId',
      onDelete: 'SET NULL'
    })
    employee.belongsTo(models.country, {
      foreignKey: 'countryId',
      onDelete: 'SET NULL'
    })
    employee.belongsTo(models.gender, {
      foreignKey: 'genderId',
      onDelete: 'SET NULL'
    })
    employee.belongsTo(models.designation, {
      foreignKey: 'designationId',
      onDelete: 'SET NULL'
    })
    employee.hasOne(models.employeeLogin, { foreignKey: 'employeeId', onDelete: 'CASCADE' })

    employee.hasMany(models.empWorkExperience, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    employee.belongsToMany(models.skill, {
      through: { model: 'empSkill', unique: false },
      foreignKey: 'employeeId'
    })
    employee.belongsToMany(models.degree, {
      through: { model: 'empDegree', unique: false },
      foreignKey: 'employeeId'
    })

    employee.belongsToMany(models.certification, {
      through: { model: 'empCertifications', unique: false },
      foreignKey: 'employeeId'
    })
  }

  return employee
}
