const models = require('../database/models')

/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getGenders = async () => {
  const genders = await models.gender.findAll({
    attributes: ['id', 'gender']
  })
  return genders
}

const getGender = async (genderId) => {
  const gender = await models.gender.findByPk(genderId)
  return gender
}

const addGender = async (gender) => {
  var created = false
  const found = await models.gender.findOne({ where: { gender: gender } })
  if (!found) {
    await models.gender.create({ gender: gender })
    created = true
  }
  return created
}

const deleteGender = async (genderId) => {
  var deleted = false
  const gender = await getGender(genderId)
  if (gender != null) {
    await gender.destroy()
    deleted = true
  }
  return deleted
}

const updateGender = async (data) => {
  var updated = false
  const gender = await getGender(data.genderId)
  if (gender != null) {
    await gender.update({ gender: data.genderType })
    updated = true
  }
  return updated
}

module.exports = {
  addGender, getGenders, getGender, deleteGender, updateGender
}
