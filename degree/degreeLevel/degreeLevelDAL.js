/* eslint-disable eqeqeq */
const models = require('../../database/models')

/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getLevels = async () => {
  const levels = await models.degreeLevel.findAll({
    order: [
      ['id', 'ASC']
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [{
      model: models.degree
    }]
  })
  return levels
}
const getLevel = async (levelId) => {
  const level = await models.degreeLevel.findByPk(levelId, {
    order: [
      ['id', 'ASC']
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [{
      model: models.degree
    }]
  })
  return level
}

const addLevel = async (level) => {
  var created = false
  var degreeLevel = await models.degreeLevel.findOne({ where: { degreeLevel: level } })
  if (!degreeLevel) {
    await models.degreeLevel.create({ degreeLevel: level })
    created = true
  }
  return created
}
const addWithDegree = async (data) => {
  var created = false
  var level = await models.degreeLevel.findOne({ where: { degreeLevel: data.degreeLevel } })
  if (!level) {
    level = await models.degreeLevel.create({ degreeLevel: data.degreeLevel })
  }
  var i
  for (i = 0; i < data.degrees.length; i++) {
    var degree = await models.degree.findOne({ where: { degreeName: data.degrees[i] } })
    if (!degree) {
      await level.createDegree({
        degreeName: data.degrees[i]
      })
      created = true
    }
  }
  return created
}

const updateLevel = async (data) => {
  var updated = false
  const level = await getLevel(data.degreeLevelId)
  if (level) {
    if (level.degreeLevel !== data.degreeLevel) {
      await level.update({ degreeLevel: data.degreeLevel })
      updated = true
    }
    var i
    var j
    var exist = false
    const degrees = await models.degree.findAll({ where: { degreeLevelId: data.degreeLevelId } })
    for (i = 0; i < degrees.length; i++) {
      for (j = 0; j < data.degrees.length; j++) {
        if (degrees[i].id == data.degrees[j].id) {
          exist = true
          break
        }
      }
      if (exist) {
        if ((degrees[i].degreeName !== data.degrees[j].degreeName)) {
          await degrees[i].update({ degreeName: data.degrees[j].degreeName }, {
            where: { id: data.degrees[j].id }
          })
        }
      } else {
        await degrees[i].destroy()
      }
      exist = false
    }
    updated = true
  }
  return updated
}

const deleteLevel = async (levelId) => {
  var deleted = false
  const level = await getLevel(levelId)
  if (level) {
    await level.destroy()
    deleted = true
  }
  return deleted
}
module.exports = {
  getLevels, getLevel, addLevel, deleteLevel, updateLevel, addWithDegree
}
