const models = require('../database/models')
/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getDegrees = async () => {
  const degrees = await models.degree.findAll({
    include: [{
      model: models.degreeLevel
    }]
  })
  return degrees
}

const getDegree = async (degreeId) => {
  const degree = await models.degree.findByPk(degreeId)
  return degree
}

const addDegree = async (data) => {
  var created = false
  var degreeLevel = await models.degreeLevel.findOne({ where: { id: data.degreeLevelId } })
  var degree = await models.degree.findOne({ where: { degreeName: data.degreeName } })
  if (degreeLevel) {
    if (!degree) {
      await models.degree.create({
        degreeLevelId: data.degreeLevelId,
        degreeName: data.degreeName
      })
      created = true
    }
  }
  return created
}
const deleteDegree = async (degreeId) => {
  var deleted = false
  const degree = await getDegree(degreeId)
  if (degree) {
    await degree.destroy()
    deleted = true
  }
  return deleted
}

const updateDegree = async (data) => {
  var updated = false
  const degree = await getDegree(data.degreeId)
  if (degree && (degree.degreeName !== data.degreeName)) {
    await degree.update({
      degreeName: data.degreeName
    })
    updated = true
  }
  return updated
}
module.exports = {
  getDegrees, getDegree, addDegree, deleteDegree, updateDegree
}
