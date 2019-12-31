const Validator = require('validator')
const isEmptyy = require('is-empty')
const messages = require('../employeeValidation')
module.exports = function validateRegisterInput (data, isSignUp) {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions

  data.email = !isEmptyy(data.email) ? data.email : ''
  data.password = !isEmptyy(data.password) ? data.password : ''
  if (isSignUp) {
    data.firstName = !isEmptyy(data.firstName) ? data.firstName : ''
    data.lastName = !isEmptyy(data.lastName) ? data.lastName : ''
    // Name checks
    if (Validator.isEmpty(data.firstName)) {
      errors.firstName = messages.Employee.firstName
    }
    if (Validator.isEmpty(data.lastName)) {
      errors.lastName = messages.Employee.lastName
    }
    if (isEmptyy(data.designationId)) {
      errors.designationId = messages.Employee.designationId
    }
    if (isEmptyy(data.isAdmin)) {
      errors.admin = messages.Employee.admin
    }
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = messages.Email.notEmail
  } else if (!Validator.isEmail(data.email)) {
    errors.email = messages.Email.notFormat
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = messages.Password.notPassword
  } else if (!Validator.isLength(data.password, { min: 7, max: 15 })) {
    errors.password = messages.Password.passwordLength
  }

  return {
    errors,
    isValid: isEmptyy(errors)
  }
}
