const Validator = require('validator')
const isEmpty = require('is-empty')
const messages = require('../employeeValidation')
module.exports = function validateFields (data) {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.instituteName = !isEmpty(data.instituteName) ? data.instituteName : ''

  if (isEmpty(data.degreeId)) {
    errors.degreeId = messages.Degrees.notId
  }
  if (Validator.isEmpty(data.instituteName)) {
    errors.instituteName = messages.Degrees.notInstituteName
  }
  if (isEmpty(data.startYear)) {
    errors.startYear = messages.Year.notStartYear
  }
  if (isEmpty(data.endYear)) {
    errors.endYear = messages.Year.notEndYear
  }
  if (isEmpty(data.cgpa)) {
    errors.cgpa = messages.Degrees.notCgpa
  }
  if (isEmpty(data.percentage)) {
    errors.percentage = messages.Degrees.notPercentage
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
