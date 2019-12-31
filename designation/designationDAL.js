const models = require('../database/models')
/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getDesignations = async () => {
  const found = await models.designation.findAll({
    attributes: ['id', 'designation']
  })
  return found
}

const getDesignation = async (designationId) => {
  const Designation = await models.designation.findByPk(designationId)
  return Designation
}
const addDesignation = async (designation) => {
  const created = await models.designation.create({ designation: designation })
  return created
}
const deleteDesignation = async (designationId) => {
  var deleted = false
  const designation = await getDesignation(designationId)
  if (designation != null) {
    await designation.destroy()
    deleted = true
  }
  return deleted
}

const updateDesignation = async (data) => {
  var updated = false
  const designation = await getDesignation(data.designationId)
  if (designation) {
    await designation.update({ designation: data.designation })
    updated = true
  }
  return updated
}
module.exports = {
  getDesignation, getDesignations, addDesignation, deleteDesignation, updateDesignation
}
