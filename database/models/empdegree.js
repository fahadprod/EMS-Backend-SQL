'use strict'
module.exports = (sequelize, DataTypes) => {
  const empDegree = sequelize.define('empDegree', {
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
    degreeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    instituteName: DataTypes.STRING(255),
    startYear: DataTypes.DATEONLY,
    endYear: DataTypes.DATEONLY,
    cgpa: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    percentage: DataTypes.DECIMAL
  }, {})
  empDegree.associate = (models) => {
    // associations can be defined here
    empDegree.belongsTo(models.employee, { foreignKey: 'employeeId' })
    empDegree.belongsTo(models.degree, { foreignKey: 'degreeId' })
  }
  return empDegree
}
