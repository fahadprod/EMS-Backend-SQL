/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *degreeTypeDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/

const degreeDAL = require('./degreeDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./degreeValidation')

// get all of degree  (all information) controller
exports.getDegrees = async (req, res) => {
  try {
    const degrees = await degreeDAL.getDegrees()
    if (degrees.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, degrees)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get degree  (based on degreeId)
exports.getDegree = async (req, res) => {
  try {
    const degreeId = req.params.id
    if (isEmpty(degreeId)) {
      response.badRequest(res, validation.degreeId)
    }
    const degree = await degreeDAL.getDegree(degreeId)
    if (degree) {
      response.retrieved(res, degree)
    } else {
      response.notFound(res, validation.notFound)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// add degree
exports.addDegree = async (req, res) => {
  try {
    const levelId = req.body.levelId
    const degreeName = !isEmpty(req.body.degreeName) ? req.body.degreeName : ''
    if (isEmpty(levelId)) {
      response.badRequest(res, validation.degreeLevelId)
    } if (Validator.isEmpty(degreeName)) {
      response.badRequest(res, validation.degreeName)
    } else {
      const degreeInfo = {
        degreeLevelId: levelId,
        degreeName: degreeName
      }
      const created = await degreeDAL.addDegree(degreeInfo)
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

// delete degree
exports.deleteDegree = async (req, res) => {
  try {
    const degreeId = req.params.id
    if (isEmpty(degreeId)) {
      response.badRequest(res, validation.degreeId)
    } else {
      const deleted = await degreeDAL.deleteDegree(degreeId)
      if (deleted) {
        response.success(res, validation.deleted)
      } else {
        response.internalServerError(res, validation.notDeleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// update degree
exports.updateDegree = async (req, res) => {
  try {
    const degreeId = req.params.id
    const degreeName = !isEmpty(req.body.degreeName) ? req.body.degreeName : ''
    if (isEmpty(degreeId)) {
      response.badRequest(res, validation.degreeId)
    }
    if (Validator.isEmpty(degreeName)) {
      response.badRequest(res, validation.degreeName)
    } else {
      const degreeInfo = {
        degreeId: degreeId,
        degreeName: degreeName
      }
      const updated = await degreeDAL.updateDegree(degreeInfo)
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
