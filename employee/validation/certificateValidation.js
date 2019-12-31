const Validator = require('validator')
const isEmpty = require('is-empty')
const messages = require('../employeeValidation')
module.exports = function validateFields (data) {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.certificateId = !isEmpty(data.certificateId) ? data.certificateId : ''
  data.location = !isEmpty(data.location) ? data.location : ''
  data.title = !isEmpty(data.title) ? data.title : ''
  data.organization = !isEmpty(data.organization) ? data.organization : ''
  data.completionDate = !isEmpty(data.completionDate) ? data.completionDate : ''

  if (isEmpty(data.certificateId)) {
    errors.certificateId = messages.Certificate.notId
  } else if (Validator.isEmpty(data.location)) {
    errors.location = messages.Certificate.notLocation
  } else if (Validator.isEmpty(data.title)) {
    errors.title = messages.Certificate.notTitle
  } else if (Validator.isEmpty(data.organization)) {
    errors.organization = messages.Certificate.organization
  } else if (Validator.isEmpty(data.completionDate)) {
    errors.completionDate = messages.Year.notCompletionDate
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
