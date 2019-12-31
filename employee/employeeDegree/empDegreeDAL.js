/* eslint-disable eqeqeq */
const models = require('../../database/models')

exports.addEmpDegree = async (data) => {
  var success = false
  var degree = await models.degree.findByPk(data.degreeId)
  const emp = await models.employee.findByPk(data.empId)
  // eslint-disable-next-line eqeqeq
  var empDegree = await models.empDegree.findAll({ where: { employeeId: data.empId } })
  if (empDegree) {
    var i
    var exist = false
    var newDegree = await models.degree.findByPk(data.degreeId)
    for (i = 0; i < empDegree.length; i++) {
      var prevDegree = await models.degree.findByPk(empDegree[i].degreeId)
      if (newDegree.degreeLevelId == prevDegree.degreeLevelId) {
        exist = true
      }
    }
  }
  if (!exist) {
    await emp.addDegree(degree, {
      through: {
        instituteName: data.instituteName,
        startYear: data.startYear,
        endYear: data.endYear,
        cgpa: data.cgpa,
        percentage: data.percentage
      }
    })
    success = true
  }
  return success
}
exports.updateEmpDegree = async (data) => {
  var success = false
  // degree to be updated
  var updateDegree = await models.empDegree.findByPk(data.empDegreeId)
  // employee all degrees
  var empDegrees = await models.empDegree.findAll({ where: { employeeId: data.empId } })
  var i
  var exist = false
  var updateIt = false
  var prevDegree = ''
  if (empDegrees) {
    for (i = 0; i < empDegrees.length; i++) {
      prevDegree = await models.degree.findOne({ where: { id: empDegrees[i].degreeId } })
      if (prevDegree.degreeLevelId == data.degreeLevelId) {
        exist = true
        break
      }
    }
    if (exist) {
      if (updateDegree.id == empDegrees[i].id) {
        updateIt = true
      }
    } else {
      updateIt = true
    }
    if (updateIt) {
      await updateDegree.update({
        degreeId: data.degreeId,
        degreeLevelId: data.degreeLevelId,
        instituteName: data.instituteName,
        startYear: data.startYear,
        endYear: data.endYear,
        cgpa: data.cgpa,
        percentage: data.percentage
      })
      success = true
    }
  }
  return success
}
exports.deleteEmpDegree = async (data) => {
  var deleted = false
  const empDegree = await models.empDegree.findByPk(data.empDegreeId)
  if (empDegree && empDegree.employeeId == data.empId) {
    await empDegree.destroy()
    deleted = true
  }
  return deleted
}
