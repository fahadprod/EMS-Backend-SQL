/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */
const response = require('../../middleware/responses')
const validation = require('../employeeValidation')
const isEmpty = require('is-empty')
const degreeValidation = require('../validation/degreeValidation')
const employeeDegreeDAL = require('./empDegreeDAL')
// add degree controller, using this functionality employee can add degree
exports.addDegree = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    const { errors, isValid } = degreeValidation(req.body)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const degree = {
        empId: id,
        degreeLevelId: req.body.degreeLevelId,
        degreeId: req.body.degreeId,
        instituteName: req.body.instituteName,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        cgpa: req.body.cgpa,
        percentage: req.body.percentage
      }
      const degreeAdded = await employeeDegreeDAL.addEmpDegree(degree)
      if (degreeAdded) {
        response.created(res, validation.Degrees.created)
      } else {
        response.internalServerError(res, validation.Degrees.notCreated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// delete employee degree controller
exports.deleteDegree = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    const empDegreeId = req.params.empDegreeId

    if (isEmpty(empDegreeId)) {
      response.badRequest(res, validation.Degrees.notId)
    } else {
      const degreeInfo = {
        empId: id,
        empDegreeId: empDegreeId
      }
      const deleted = await employeeDegreeDAL.deleteEmpDegree(degreeInfo)
      if (deleted) {
        response.success(res, validation.Degrees.deleted)
      } else {
        response.internalServerError(res, validation.Degrees.notDeleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// update employee degree information controller
exports.updateDegree = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response(res, validation.Employee.unauthorize)
    }
    const empDegreeId = req.params.empDegreeId
    if (isEmpty(empDegreeId)) {
      response.badRequest(res, validation.Degrees.notId)
    }
    const { errors, isValid } = degreeValidation(req.body)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const degreeInfo = {
        empId: id,
        empDegreeId: empDegreeId,
        degreeLevelId: req.body.degreeLevelId,
        degreeId: req.body.degreeId,
        instituteName: req.body.instituteName,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        cgpa: req.body.cgpa,
        percentage: req.body.percentage
      }
      const updated = await employeeDegreeDAL.updateEmpDegree(degreeInfo)
      if (updated) {
        response.created(res, validation.Degrees.updated)
      } else {
        response.internalServerError(res, validation.Degrees.notUpdated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
