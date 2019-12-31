'use strict'
module.exports = (sequelize, DataTypes) => {
  const employeeLogin = sequelize.define('employeeLogin', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        len: {
          args: [7],
          message: 'password should be of length 7.'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {})
  employeeLogin.associate = (models) => {
    // associations can be defined here
    employeeLogin.belongsTo(models.employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' })
  }
  return employeeLogin
}
