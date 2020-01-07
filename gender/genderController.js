/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *genderDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/
const genderDAL = require('./genderDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./genderValidation')
/*
  controller for controlling the request recieved and response sent while request has been fulfilled.
*/

// get all of the genders controller
exports.getGenders = async (req, res) => {
  try {
    const genders = await genderDAL.getGenders()
    if (genders.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, genders,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get specific gender (based on genderID) controller
exports.getGender = async (req, res) => {
  try {
    const genderId = req.params.id
    if (isEmpty(genderId)) {
      response.badRequest(res, validation.id)
    }
    const gender = await genderDAL.getGender(genderId)
    if (gender) {
      response.retrieved(res, gender,validation.details)
    } else {
      response.notFound(res, validation.notFound)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// add gender controller, this functionality can only be accessed by admins
exports.addGender = async (req, res) => {
  try {
    const gender = !isEmpty(req.body) ? req.body.gender : ''
    if (Validator.isEmpty(gender)) {
      response.badRequest(res, validation.type)
    } else {
      const gender = req.body.gender
      const created = await genderDAL.addGender(gender)
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
// delete gender controller, this functionality can only be accessed by admins
exports.deleteGender = async (req, res) => {
  try {
    const genderId = req.params.id
    if (isEmpty(genderId)) {
      response.badRequest(res, validation.id)
    } else {
      const gender = await genderDAL.deleteGender(genderId)
      if (gender) {
        response.retrieved(res, gender)
      } else {
        response.internalServerError(res, validation.notDeleted)
      }
    }
  } catch (err) {
    res.badRequest(res, err.message)
  }
}
// update gender controller, this functionality can only be accessed by admins
exports.updateGender = async (req, res) => {
  try {
    const genderId = req.params.id
    const genderType = !isEmpty(req.body.gender) ? req.body.gender : ''
    if (isEmpty(genderId)) {
      res.badRequest(res, validation.id)
    }
    if (Validator.isEmpty(genderType)) {
      res.badRequest(res, validation.type)
    } else {
      const country = {
        genderId: genderId,
        genderType: genderType
      }
      const updated = await genderDAL.updateGender(country)
      if (updated) {
        response.created(res, validation.updated)
      } else {
        response.internalServerError(res, validation.notUpdated)
      }
    }
  } catch (err) {
    res.badRequest(res, err.message)
  }
}
