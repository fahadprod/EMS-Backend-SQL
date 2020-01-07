/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *cityDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/
const cityDAL = require('./cityDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./cityValidation')

/*
  controller for controlling the request recieved and response sent while request has been fulfilled.
*/

// get all cities controller
exports.getCities = async (req, res) => {
  try {
    const cities = await cityDAL.getCities()
    if (cities.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, cities,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get specific city controller (based on cityId)
exports.getCity = async (req, res) => {
  try {
    const cityId = req.params.id
    if (isEmpty(cityId)) {
      response.badRequest(res, validation.id)
    }
    const city = await cityDAL.getCity(cityId)
    if (city === null) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, city,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// add degree
exports.addCity = async (req, res) => {
  try {
    const countryId = req.body.countryId
    const city = !isEmpty(req.body.city) ? req.body.city : ''
    if (isEmpty(countryId)) {
      response.badRequest(res, validation.countryId)
    } if (Validator.isEmpty(city)) {
      response.badRequest(res, validation.name)
    } else {
      const cityInfo = {
        countryId: countryId,
        city: city
      }
      const created = await cityDAL.addCity(cityInfo)
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

// delete city controller (based on cityId)
exports.deleteCity = async (req, res) => {
  try {
    const cityId = req.params.id
    if (isEmpty(cityId)) {
      response.badRequest(res, validation.id)
    }
    const deleted = await cityDAL.deleteCity(cityId)
    if (deleted) {
      response.success(res, validation.deleted)
    } else {
      response.notFound(res, validation.notDeleted)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// update city controller (based on cityId)
exports.updateCity = async (req, res) => {
  try {
    const cityId = req.params.id
    const cityName = !isEmpty(req.body.city) ? req.body.city : ''
    if (isEmpty(cityId)) {
      response.badRequest(res, validation.id)
    } else if (Validator.isEmpty(cityName.trim())) {
      response.badRequest(res, validation.name)
    } else {
      const city = {
        cityId: cityId,
        cityName: cityName
      }
      const updated = await cityDAL.updateCity(city)
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
