/* eslint-disable eqeqeq */
const models = require('../../database/models')
// const model = models.country
// for (const assoc of Object.keys(model.associations)) {
//   for (const accessor of Object.keys(model.associations[assoc].accessors)) {
//     console.log(model.name + '.' + model.associations[assoc].accessors[accessor] + '()')
//   }
// }
exports.addEmpWorkExp = async (data) => {
  var success = false
  const emp = await models.employee.findByPk(data.empId)
  // eslint-disable-next-line eqeqeq
  if (emp) {
    await emp.createEmpWorkExperience({
      employeeId: data.employeeId,
      company: data.company,
      startYear: data.startYear,
      endYear: data.endYear,
      jobDescription: data.jobDescription,
      designation: data.designation
    })
    success = true
  }
  return success
}
exports.updateEmpWorkExp = async (data) => {
  var success = false
  const emp = await models.employee.findByPk(data.empId)
  const workExp = await models.empWorkExperience.findByPk(data.workExpId)
  if (emp && workExp && workExp.employeeId == emp.id) {
    await workExp.update({
      company: data.company,
      startYear: data.startYear,
      endYear: data.endYear,
      jobDescription: data.jobDescription,
      designation: data.designation
    })
    success = true
  }
  console.log(false)
  return success
}
exports.deleteEmpWorkExp = async (data) => {
  var deleted = false
  const workExp = await models.empWorkExperience.findByPk(data.workExpId)
  if (workExp && workExp.employeeId == data.empId) {
    await workExp.destroy()
    deleted = true
  }
  return deleted
}
