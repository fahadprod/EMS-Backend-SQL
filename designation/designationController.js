/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *designationDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/
const designationDAL = require('./designationDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./designationValidation')

/*
  controller for controlling the request recieved and response sent while request has been fulfilled.
*/

// get all designations controller
exports.getDesignations = async (req, res) => {
  try {
    const designations = await designationDAL.getDesignations()
    if (designations.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, designations)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get specific Designation controller (based on DesignationId)
exports.getDesignation = async (req, res) => {
  try {
    const designationId = req.params.id
    if (isEmpty(designationId)) {
      response.badRequest(res, validation.id)
    }
    const designation = await designationDAL.getDesignation(designationId)
    if (designation === null) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, designation)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
exports.addDesignation = async (req, res) => {
  try {
    const designation = !isEmpty(req.body) ? req.body.designation : ''
    if (Validator.isEmpty(designation)) {
      response.notFound(res, validation.designation)
    } else {
      const designation = req.body.designation
      const created = await designationDAL.addDesignation(designation)
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
// delete Designation controller (based on DesignationId)
exports.deleteDesignation = async (req, res) => {
  try {
    const designationId = req.params.id
    if (isEmpty(designationId)) {
      response.badRequest(res, validation.id)
    } else {
      const deleted = await designationDAL.deleteDesignation(designationId)
      if (deleted) {
        response.success(res, validation.deleted)
      } else {
        response.notFound(res, validation.notDeleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// update Designation controller (based on cityId)
exports.updateDesignation = async (req, res) => {
  try {
    const designationId = req.params.id
    const designationName = !isEmpty(req.body.designation) ? req.body.designation : ''
    if (isEmpty(designationId)) {
      response.badRequest(res, validation.id)
    }
    if (Validator.isEmpty(designationName)) {
      response.badRequest(res, validation.designation)
    } else {
      const designation = {
        designationId: designationId,
        designation: designationName
      }
      const updated = await designationDAL.updateDesignation(designation)
      if (updated) {
        response.created(res, validation.updated)
      } else {
        response.notFound(res, validation.notUpdated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
