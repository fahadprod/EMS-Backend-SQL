/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *skillDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/
const skillDAL = require('./skillDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./skillValidation')
/*
  controller for controlling the request recieved and response sent while request has been fulfilled.
*/

// get all of the skills controller
exports.getSkills = async (req, res) => {
  try {
    const skills = await skillDAL.getSkills()
    if (skills.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, skills, validation.details)
    }
  } catch (err) {
    response.badRequest(res)
  }
}

// get specific skill (based on skillId) controller
exports.getSkill = async (req, res) => {
  try {
    const skillId = req.params.id
    if (isEmpty(skillId)) {
      response.badRequest(res, validation.id)
    }
    const skill = await skillDAL.getSkill(skillId)
    if (skill === null) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, skill, validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// add skill controller, this functionality can only be accessed by admins
exports.addSkill = async (req, res) => {
  try {
    const skillName = !isEmpty(req.body.skill) ? req.body.skill : ''
    if (Validator.isEmpty(skillName)) {
      response.badRequest(res, validation.name)
    } else {
      const created = await skillDAL.addSkill(skillName)
      if (created) {
        response.created(res, validation.created)
      } else {
        response.internalServerError(res, validation.notCreated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// delete skill controller, this functionality can only be accessed by admins
exports.deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id
    if (isEmpty(skillId)) {
      response.badRequest(res.sMessage.id)
    }
    const deleted = await skillDAL.deleteSkill(skillId)
    if (deleted) {
      response.success(res, validation.deleted)
    } else {
      response.internalServerError(res, validation.notDeleted)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// update skill controller, this functionality can only be accessed by admins
exports.updateSkill = async (req, res) => {
  try {
    const skillId = req.params.id
    const skillName = !isEmpty(req.body.skill) ? req.body.skill : ''
    if (isEmpty(skillId)) {
      response.badRequest(res, validation.id)
    }
    if (Validator.isEmpty(skillName.trim())) {
      response.badRequest(res, validation.name)
    }
    const skill = {
      skillId: skillId,
      skillName: skillName.trim()
    }
    const updated = await skillDAL.updateSkill(skill)
    if (updated) {
      response.created(res, validation.updated)
    } else {
      response.internalServerError(res, validation.notUpdated)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
