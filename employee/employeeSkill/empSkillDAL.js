/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */
const models = require('../../database/models')

exports.editEmpSkill = async (data) => {
  var success = false
  const emp = await models.employee.findOne({ where: { id: data.empId } })
  if (emp) {
    await models.empSkill.destroy({ where: { employeeId: data.empId } })
    var i
    for (i = 0; i < data.skillId.length; i++) {
      var skill = await models.skill.findOne({ where: { id: data.skillId[i] } })
      if (skill) {
        const empSkill = await models.empSkill.findOne({ where: { skillId: data.skillId[i], employeeId: data.empId } })
        if (!empSkill) {
          await emp.addSkill(skill)
        }
      }
    }
    success = true
  }
  return success
}
// returns the count of employees for specific skill
exports.getEmployeeCount = async () => {
  const emp = await models.empSkill.findAndCountAll({
    group: 'skillId',
    attributes: ['skillId'],
    include: [{
      model: models.skill,
      attributes: ['skill']
    }]
  })
  const empObj = []
  var i
  for (i = 0; i < emp.rows.length; i++) {
    var newElement = {}
    if (emp.rows[i].skill != null) {
      newElement.count = emp.count[i].count
      newElement.skill = emp.rows[i].skill.skill
      empObj.push(newElement)
    }
  }
  return empObj
}
