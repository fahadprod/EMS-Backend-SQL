/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *countryDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/

const countryDAL = require('./countryDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./countryValidation')

// get all Countries controller
exports.getCountries = async (req, res) => {
  try {
    const countries = await countryDAL.getCountries()
    if (countries.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, countries,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// get cities of specific country (based on countryId) controller
exports.getCities = async (req, res) => {
  try {
    const cities = await countryDAL.getCities(req.params.id)
    if (cities.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, cities,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// get specific country (based on countryId) controller
exports.getCountry = async (req, res) => {
  try {
    const countryId = req.params.id
    const country = await countryDAL.getCountry(countryId)
    if (country === null) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, country,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// add country controller
exports.addCountry = async (req, res) => {
  try {
    const country = !isEmpty(req.body) ? req.body.country : ''
    if (Validator.isEmpty(country.trim())) {
      response.notFound(res, validation.notCreated)
    } else {
      const country = { country: req.body.country }
      const created = await countryDAL.addCountry(country)
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
// add/create cities to respective countries controller
exports.addCities = async (req, res) => {
  try {
    const country = !isEmpty(req.body.country) ? req.body.country : ''
    const cities = !isEmpty(req.body.cities) ? req.body.cities : ''
    if (Validator.isEmpty(country.trim())) {
      response.badRequest(res, validation.countryName)
    } if (isEmpty(cities)) {
      response.badRequest(res, validation.cities)
    } else {
      const info = {
        country: country,
        cities: cities
      }
      const created = await countryDAL.addCities(info)
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
// delete country controller
exports.deleteCountry = async (req, res) => {
  try {
    const countryId = req.params.id
    if (isEmpty(countryId)) {
      response.badRequest(res, validation.id)
    } else {
      const deleted = await countryDAL.deleteCountry(countryId)
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
// update country controller
exports.updateCountry = async (req, res) => {
  try {
    const countryId = req.params.id
    const countryName = !isEmpty(req.body.country) ? req.body.country : ''
    const cities = !isEmpty(req.body.cities) ? req.body.cities : ''
    if (isEmpty(countryId)) {
      response.badRequest(res, validation.id)
    }
    if (Validator.isEmpty(countryName.trim())) {
      response.badRequest(res, validation.countryName)
    } if (isEmpty(cities)) {
      response.badRequest(res, validation.cities)
    } else {
      const countryInfo = {
        countryId: countryId,
        countryName: countryName,
        cities: cities
      }
      const updated = await countryDAL.updateCountry(countryInfo)
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
