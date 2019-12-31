const Validator = require('validator')
const isEmpty = require('is-empty')
const messages = require('../employeeValidation')
module.exports = function validateFields (data) {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.company = !isEmpty(data.company) ? data.company : ''
  data.jobDescription = !isEmpty(data.jobDescription) ? data.jobDescription : ''
  data.designation = !isEmpty(data.designation) ? data.designation : ''

  if (Validator.isEmpty(data.company)) {
    errors.company = messages.Employee.notCompany
  }
  if (Validator.isEmpty(data.designation)) {
    errors.designation = messages.Designation.notDesignation
  }
  if (isEmpty(data.startYear)) {
    errors.startYear = messages.Year.notStartYear
  }
  if (isEmpty(data.endYear)) {
    errors.endYear = messages.Year.notEndYear
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
