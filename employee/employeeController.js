/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */
/*
  controller for controlling the request recieved and response sent while request has been fulfilled.

  *employeeDAL: is a data access layer object to get data from the database
  *bcrypt: used for hashing passwords.
  *isEmpty: to checks if the incoming field is empty
  *responses: requiring  generic responses
  *validation: customized messages related to skill model

*/

const employeeDAL = require('./employeeDAL')
const Validator = require('validator')
const isEmpty = require('is-empty')
const bcrypt = require('bcrypt')
const response = require('../middleware/responses')
const validation = require('./employeeValidation')
var fs = require('fs')
/*
  validation checks
*/
const credentialValidation = require('./validation/signupValidation')

// function to hash password
async function hashPassword (password) {
  const hashed = await bcrypt.hash(password, parseInt(process.env.saltRounds))
  return hashed
}

/*
    get functionalities
*/

// get all of the employees (all information) controller
exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const offset = page * pageSize
    const limit = pageSize
    const employees = await employeeDAL.getEmployees(offset, limit)
    if (employees.length === 0) {
      response.notFound(res, validation.Employee.notEmployee)
    } else {
      response.retrieved(res, employees)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get employees basic info controller
exports.getEmpBasicInfo = async (req, res) => {
  try {
    // const page = parseInt(req.query.page)
    // const pageSize = parseInt(req.query.pageSize)
    // const offset = page * pageSize
    // const limit = pageSize
    const employees = await employeeDAL.getEmpBasicInfo()
    if (employees.length === 0) {
      response.notFound(res, validation.Employee.notEmployee)
    } else {
      response.retrieved(res, employees)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

// get employee (based on employeeId) controller
exports.getEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id
    if (isEmpty(employeeId)) {
      response.badRequest(res, validation.Employee.employeeId)
    }
    const employee = await employeeDAL.getEmployee(employeeId)
    if (employee) {
      response.retrieved(res, employee)
    } else {
      response.notFound(res, validation.Employee.notEmployee)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// returns the count of employees for specific skill
exports.getEmployeeCount = async (req, res) => {
  try {
    const employees = await employeeDAL.getEmployeeCount()
    if (employees.length === 0) {
      response.notFound(res, validation.notFound)
    } else {
      response.retrieved(res, employees)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

/*
    signup,login,logout functionalities
*/

// signup/add employee controller,  this functionality can only be accessed by admins
exports.signUp = async (req, res) => {
  try {
    const signUp = true
    const { errors, isValid } = credentialValidation(req.body, signUp)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const hashedPassword = await hashPassword(req.body.password)
      const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
        designationId: req.body.designationId
      }
      const created = await employeeDAL.signup(employee)
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
// login controller
exports.login = async (req, res) => {
  try {
    const signUp = false
    const { errors, isValid } = credentialValidation(req.body, signUp)
    if (!isValid) {
      response.badRequest(res, errors)
    } else {
      const credentials = {
        email: req.body.email,
        password: req.body.password
      }
      const employee = await employeeDAL.login(credentials)
      if (employee.success) {
        response.Login(res, validation.Login.successful, employee)
      } else {
        response.badRequest(res, validation.Login.unsucessful)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// logout controller
exports.logout = async (req, res) => {
  try {
    const logout = await employeeDAL.logout(req.token, req.expiry)
    if (logout) {
      // req.session = null
      response.success(res, validation.Logout.successful)
    } else {
      response.internalServerError(res, validation.Logout.unsucessful)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}

/*
    update functionalities
*/

// update employee basic information controller
exports.updateEmpBasicInfo = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else if (req.params.id == req.id) {
      id = req.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    var empInfo = {
      empId: id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contactNumber: req.body.contactNumber,
      age: req.body.age ? req.body.age : null,
      genderId: req.body.genderId ? req.body.genderId : null,
      address: req.body.address,
      cityId: req.body.cityId ? req.body.cityId : null,
      countryId: req.body.countryId ? req.body.countryId : null,
      description: req.body.description,
      designationId: req.body.designationId ? req.body.designationId : null
    }
    const updated = await employeeDAL.updateEmpBasicInfo(empInfo)
    if (updated) {
      response.created(res, validation.updated)
    } else {
      response.internalServerError(res, validation.notUpdated)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
// change password controller
exports.updateLoginCredentials = async (req, res) => {
  try {
    if (Validator.isEmpty(req.body.password)) {
      response.badRequest(res, validation.Password.password)
    } else if (!Validator.isLength(req.body.password, { min: 7, max: 15 })) {
      response.badRequest(res, validation.Password.passwordLength)
    } else {
      const hashedPassword = await hashPassword(req.body.password)
      var credentials = {
        password: hashedPassword
      }
      if (req.params.id == req.id) {
        if (req.body.currentPassword) {
          credentials['empId'] = req.id
          credentials['currentPassword'] = req.body.currentPassword
        } else {
          response.badRequest(res, validation.Password.currentPassword)
        }
      } else if (req.isAdmin) {
        credentials['empId'] = req.params.id
        credentials['email'] = req.body.email
      } else {
        response.unauthorized(res, validation.Employee.unauthorize)
      }
      const updated = await employeeDAL.updateLoginCredentials(credentials)
      if (updated) {
        response.created(res, validation.Password.changed)
      } else {
        response.internalServerError(res, validation.Password.notChanged)
      }
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
exports.uploadImage = async (req, res) => {
  var id = ''
  const data = {
    picture: '',
    employeeId: ''
  }
  var file = req.files
  if (req.isAdmin) {
    id = req.params.id
  } else if (req.params.id == req.id) {
    id = req.id
  } else {
    response.unauthorized(res, validation.Employee.unauthorize)
  }
  data.employeeId = id
  if (!file) {
    data.picture = fs.readFileSync(process.env.DEFAULT_IMAGE)
  } else if (file.image.mimetype === 'image/jpeg' ||
    file.image.mimetype === 'image/png' || file.image.mimetype === 'image/gif') {
    data.picture = file.image.data
  } else {
    response.internalServerError(res, 'The type of image must be jpeg/png/gif. ')
  }
  const uploaded = await employeeDAL.uploadImage(data)
  if (uploaded) {
    response.success(res, validation.profilePic.uploaded)
  } else {
    response.internalServerError(res, validation.profilePic.notUploaded)
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    var id = ''
    if (req.isAdmin) {
      id = req.params.id
    } else {
      response.unauthorized(res, validation.Employee.unauthorize)
    }
    const empWorkExpId = req.params.id

    if (isEmpty(empWorkExpId)) {
      response.badRequest(res, validation.Employee.employeeId)
    }
    const deleted = await employeeDAL.deleteEmployee(id)
    if (deleted) {
      response.success(res, validation.deleted)
    } else {
      response.internalServerError(res, validation.notDeleted)
    }
  } catch (err) {
    response.badRequest(res, err.message)
  }
}
