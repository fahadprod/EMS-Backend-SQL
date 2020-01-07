/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *certificationDAL: is a data access layer object to get data from the database
  *Validator: used for type validation
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/
const certificationDAL = require('./certificationDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const response = require('../middleware/responses')
const validation = require('./certificationValidation')

/*
  controller for controlling the request recieved and response sent while request has been fulfilled.
*/

// get all of the certificates controller
exports.getCertificates = async (req, res) => {
  try {
    const certificates = await certificationDAL.getCertificates()
    if (certificates.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, certificates,validation.details)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// get single certificate based on (certificateId) controller
exports.getCertificate = async (req, res) => {
  try {
    const certificateId = req.params.id
    if (isEmpty(certificateId)) {
      response.badRequest(res, validation.id)
    } else {
      const certificate = await certificationDAL.getCertificate(certificateId)
      if (certificate) {
        response.retrieved(res, certificate,validation.details)
      } else {
        response.notFound(res, validation.notFound)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// add certificate, this functionality can only be accessed by admins
exports.addCertificate = async (req, res) => {
  try {
    const certificate = !isEmpty(req.body.certification) ? req.body.certification : ''
    if (Validator.isEmpty(certificate.trim())) {
      response.badRequest(res, validation.name)
    } else {
      const created = await certificationDAL.addCertificate(certificate.trim())
      if (created) {
        response.created(res, validation.created)
      } else {
        response.internalServerError(res, validation.notCreated)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// delete certificate, this functionality can only be accessed by admins
exports.deleteCertificate = async (req, res) => {
  try {
    const certificateId = req.params.id
    if (isEmpty(certificateId)) {
      response.badRequest(res, validation.id)
    } else {
      const deleted = await certificationDAL.deleteCertificate(certificateId)
      if (deleted) {
        response.success(res, validation.deleted)
      } else {
        response.internalServerError(res, validation.notDeleted)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// update certificate, this functionality can only be accessed by admins
exports.updateCertificate = async (req, res) => {
  try {
    const certificateId = req.params.id
    const certificateName = !isEmpty(req.body.certification) ? req.body.certification : ''
    if (isEmpty(certificateId)) {
      response.badRequest(res, validation.id)
    }
    if (Validator.isEmpty(certificateName.trim())) {
      response.badRequest(res, validation.name)
    }
    const certificate = {
      certificateId: certificateId,
      certificateName: certificateName.trim()
    }
    const updated = await certificationDAL.updateCertificate(certificate)
    if (updated) {
      response.created(res, validation.updated)
    } else {
      response.internalServerError(res, validation.notUpdated)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
