/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */

const response = require('../../middleware/responses')
const validation = require('../employeeValidation')
const isEmpty = require('is-empty')
const certificateValidation = require('../validation/certificateValidation')
const employeeDegreeDAL = require('./empCertificationDAL')

// add certificate controller, using this functionality employee can add certificate
exports.addCertificate = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    const { errors, isValid } = certificateValidation(req.body)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const data = {
        empId: id,
        certificateId: req.body.certificateId,
        title: req.body.title,
        organization: req.body.organization,
        completionDate: req.body.completionDate,
        location: req.body.location
      }
      const certificationAdded = await employeeDegreeDAL.addEmpCertificate(data)
      if (certificationAdded) {
        response.created(res, validation.Certificate.created)
      } else {
        response.internalServerError(res, validation.Certificate.notCreated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// update employee certifcation information controller
exports.updateCertificate = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }

    const { errors, isValid } = certificateValidation(req.body)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const data = {
        empId: id,
        empCertificateId: req.params.empCertificateId,
        certificationId: req.body.certificateId,
        title: req.body.title,
        organization: req.body.organization,
        completionDate: req.body.completionDate,
        location: req.body.location
      }
      const updated = await employeeDegreeDAL.updateEmpCertificate(data)
      if (updated) {
        response.created(res, validation.Certificate.created)
      } else {
        response.internalServerError(res, validation.Certificate.notCreated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// delete employee certificate controller
exports.deleteCertificate = async (req, res) => {
  try {
    const empCertificateId = req.params.empCertificateId
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    if (isEmpty(empCertificateId)) {
      response.badRequest(res, validation.empCertificateId)
    } else {
      const degreeInfo = {
        empId: id,
        empCertificateId: empCertificateId
      }
      const deleted = await employeeDegreeDAL.deleteEmpCertificate(degreeInfo)
      if (deleted) {
        response.success(res, validation.Certificate.deleted)
      } else {
        response.internalServerError(res, validation.Certificate.notDeleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
