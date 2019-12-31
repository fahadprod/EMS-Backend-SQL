/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */
const response = require('../../middleware/responses')
const validation = require('../employeeValidation')
const employeeSkillDAL = require('./empSkillDAL')

exports.editSkill = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    const skillId = req.body.skillId
    const data = {
      empId: id,
      skillId: skillId
    }
    const skillAdded = await employeeSkillDAL.editEmpSkill(data)
    if (skillAdded) {
      response.created(res, validation.Skill.updated)
    } else {
      response.internalServerError(res, validation.Skill.notUpdated)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// returns the count of employees for specific skill
exports.getEmployeeCount = async (req, res) => {
  try {
    const employees = await employeeSkillDAL.getEmployeeCount()
    if (employees.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, employees)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
