const models = require('../database/models')
/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getCities = async () => {
  const cityFound = await models.city.findAll({
    attributes: ['id', 'city','countryId']
  })
  return cityFound
}

const getCity = async (cityId) => {
  const city = await models.city.findByPk(cityId)
  return city
}

const addCity = async (data) => {
  var created = false
  var country = await models.country.findOne({ where: { id: data.countryId } })
  var city = await models.city.findOne({ where: { city: data.city } })
  if (country) {
    if (!city) {
      await models.city.create({
        city: data.city,
        countryId: data.countryId
      })
      created = true
    }
  }
  return created
}
const deleteCity = async (cityId) => {
  var deleted = false
  const city = await getCity(cityId)
  if (city != null) {
    await city.destroy()
    deleted = true
  }
  return deleted
}

const updateCity = async (data) => {
  var updated = false
  const city = await getCity(data.cityId)
  if (city && (city.city !== data.city)) {
    await city.update({ city: data.city })
    updated = true
  }
  return updated
}
module.exports = {
  getCity, addCity, getCities, deleteCity, updateCity
}
