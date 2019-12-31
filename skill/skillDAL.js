const models = require('../database/models')

/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getSkills = async () => {
  const skills = await models.skill.findAll()
  return skills
}

const getSkill = async (skillId) => {
  const skill = await models.skill.findByPk({
    skillId,
    attributes: ['id', 'skill']
  })
  return skill
}

const addSkill = async (skill) => {
  var created = false
  const found = await models.skill.findOne({ where: { skill: skill } })
  if (!found) {
    await models.skill.create({
      skill: skill
    })
    created = true
  }
  return created
}

const deleteSkill = async (skillId) => {
  var deleted = false
  const skill = await models.skill.findByPk(skillId)
  if (skill != null) {
    await skill.destroy()
    deleted = true
  }
  return deleted
}

const updateSkill = async (data) => {
  var updated = false
  const skill = await models.skill.findByPk(data.skillId)
  if (skill != null) {
    await skill.update({ skill: data.skillName })
    updated = true
  }
  return updated
}
module.exports = {
  getSkills, getSkill, addSkill, deleteSkill, updateSkill
}
