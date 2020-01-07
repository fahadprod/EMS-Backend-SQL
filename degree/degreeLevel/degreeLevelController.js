/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *degreeTypeDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *response: requiring  generic responses
  *validation: customized messages related to skill model

*/

const degreeTypeDAL = require('./degreeLevelDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../../middleware/responses')
const validation = require('./degreeLevelValidation')

// get all of degree levels (all information) controller
exports.getLevels = async (req, res) => {
  try {
    const levels = await degreeTypeDAL.getLevels()
    if (levels.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, levels, validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get degree level (based on degreeId) along with degree types
exports.getLevel = async (req, res) => {
  try {
    const levelId = req.params.id
    const level = await degreeTypeDAL.getLevel(levelId)
    if (!level) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, level, validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// add degree level
exports.addLevel = async (req, res) => {
  try {
    const level = !isEmpty(req.body) ? req.body.level : ''
    if (Validator.isEmpty(level)) {
      response.badRequest(res, validation.degreeLevel)
    } else {
      const level = { degreeLevel: req.body.level }
      const created = await degreeTypeDAL.addLevel(level)
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

// add to existing or create new degree level along with degree types
exports.addWithDegree = async (req, res) => {
  try {
    const level = !isEmpty(req.body) ? req.body.level : ''
    const degrees = req.body.degrees
    if (Validator.isEmpty(level)) {
      response.badRequest(res, validation.degreeLevel)
    } if (isEmpty(degrees)) {
      response.badRequest(res, validation.degrees)
    } else {
      const data = {
        degreeLevel: level,
        degrees: degrees
      }
      const created = await degreeTypeDAL.addWithDegree(data)
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

// delete degree level
exports.deleteLevel = async (req, res) => {
  try {
    const levelId = req.params.id
    if (isEmpty(levelId)) {
      response.badRequest(res, validation.id)
    } else {
      const deleted = await degreeTypeDAL.deleteLevel(levelId)
      if (!deleted) {
        response.internalServerError(res, validation.notDeleted)
      } else {
        response.success(res, validation.deleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// update degree level
exports.updateLevel = async (req, res) => {
  try {
    const levelId = req.params.id
    const level = !isEmpty(req.body.degreeLevel) ? req.body.degreeLevel : ''
    const degrees = !isEmpty(req.body.degrees) ? req.body.degrees : ''

    if (Validator.isEmpty(level)) {
      response.badRequest(res, validation.degreeLevel)
    }
    if (isEmpty(degrees)) {
      response.badRequest(res, validation.degrees)
    } else {
      const levelInfo = {
        degreeLevelId: levelId,
        degreeLevel: level,
        degrees: degrees
      }

      const updated = await degreeTypeDAL.updateLevel(levelInfo)
      if (updated) {
        response.created(res, validation.updated)
      } else {
        response.internalServerError(res, validation.notUpdated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
