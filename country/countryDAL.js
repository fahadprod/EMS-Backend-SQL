const models = require('../database/models')

/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getCountries = async () => {
  const countryFound = await models.country.findAll({
    include: [
      {
        model: models.city,
        attributes: ['id', 'city']
      }
    ],
    attributes: ['id', 'country']
  })
  return countryFound
}
const getCities = async (countryId) => {
  const countryFound = await models.country.findByPk(countryId, {
    include: [
      {
        model: models.city,
        attributes: ['id', 'city']
      }
    ],
    attributes: ['id', 'country']
  })
  return countryFound
}
const getCountry = async (coutnryId) => {
  const country = await models.country.findByPk(coutnryId, {
    include: [
      {
        model: models.city,
        attributes: ['id', 'city', 'countryId']
      }
    ],
    // attributes: ['id', 'country']
  })
  return country
}
const addCountry = async (country) => {
  const createdCountry = await models.country.create(country)
  return createdCountry
}
const addCities = async (data) => {
  var created = false
  var country = await models.country.findOne({ where: { country: data.country } })
  if (!country) {
    country = await models.country.create({ country: data.country })
  }
  var i
  for (i = 0; i < data.cities.length; i++) {
    var city = await models.city.findOne({ where: { city: data.cities[i] } })
    if (!city) {
      await country.createCity({
        city: data.cities[i]
      })
      created = true
    }
  }
  return created
}
const deleteCountry = async (countryId) => {
  var deleted = false
  const country = await getCountry(countryId)
  if (country != null) {
    await country.destroy()
    deleted = true
  }
  return deleted
}
const updateCountry = async (data) => {
  var updated = false
  const country = await getCountry(data.countryId)
  if (country) {
    if (country.country !== data.countryName) {
      await models.country.update({ country: data.countryName }, { where: { id: data.countryId } })
      updated = true
    }
    var i
    var j
    var exist = false
    for (i = 0; i < country.cities.length; i++) {
      for (j = 0; j < data.cities.length; j++) {
        if(country.cities[i].id == data.cities[j].id) {
          exist = true
          break
        }
      }
    if (exist) {
      if ((country.cities[i].city !== data.cities[j].city)) {
        await country.cities[i].update({ city: data.cities[j].city }, {
          where: { id: data.cities[j].id }
        })
      }
    } else {
      var city = await models.city.findOne({ 
        where: { id: country.cities[i].id}
      })
      await city.destroy()
    }
    exist = false
  }
    updated = true
  }
   
  return updated
}
module.exports = {
  addCountry,
  addCities,
  getCountries,
  getCities,
  getCountry,
  deleteCountry,
  updateCountry
}
