/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */

const response = require('../../middleware/responses')
const validation = require('../employeeValidation')
const isEmpty = require('is-empty')
const empWorkExpDAL = require('./empWorkExpDAL')
const workExpValidation = require('../validation/workExperienceValidation')

exports.addWorkExp = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    const { errors, isValid } = workExpValidation(req.body)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const workExperience = {
        empId: id,
        company: req.body.company,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        jobDescription: req.body.jobDescription,
        designation: req.body.designation
      }
      const created = await empWorkExpDAL.addEmpWorkExp(workExperience)
      if (created) {
        response.created(res, validation.workExperience.created)
      } else {
        response.internalServerError(res, validation.workExperience.notCreated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
exports.updateWorkExp = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response(res, validation.Employee.unauthorize)
    }
    const empWorkExpId = req.params.expId
    if (isEmpty(empWorkExpId)) {
      response.badRequest(res, validation.empDegreeId)
    }
    const { errors, isValid } = workExpValidation(req.body)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const workExp = {
        empId: id,
        workExpId: empWorkExpId,
        company: req.body.company,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        jobDescription: req.body.jobDescription,
        designation: req.body.designation
      }
      const updated = await empWorkExpDAL.updateEmpWorkExp(workExp)
      if (updated) {
        response.created(res, validation.workExperience.updated)
      } else {
        response.internalServerError(res, validation.workExperience.notUpdated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
exports.deleteWorkExp = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }

    const empWorkExpId = req.params.expId
    if (isEmpty(empWorkExpId)) {
      response.badRequest(res, validation.workExperience.notId)
    } else {
      const workExp = {
        empId: id,
        workExpId: empWorkExpId
      }
      const deleted = await empWorkExpDAL.deleteEmpWorkExp(workExp)
      if (deleted) {
        response.success(res, validation.workExperience.deleted)
      } else {
        response.internalServerError(res, validation.workExperience.notDeleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
