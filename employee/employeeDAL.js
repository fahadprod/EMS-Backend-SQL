/* eslint-disable eqeqeq */
const models = require('../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// function to find email
const findEmail = async (email) => {
  const found = await models.employeeLogin.findOne({ where: { email: email } }, { raw: true })
  return found
}
// function to validate password
const validatePassword = async (plainPassword, hashedPassword) => {
  const matched = await bcrypt.compare(plainPassword, hashedPassword)
  return matched
}

/*

  Data Access Layer, this file contains all of the functions that deals with actual business logic.

*/
exports.getEmployees = async (offset, limit) => {
  const employees = await models.employee.findAndCountAll({
    include: [
      {
        model: models.gender,
        attributes: ['id', 'gender'],
        required: false
      },
      {
        model: models.city,
        attributes: ['id', 'city'],
        required: false
      },
      {
        model: models.country,
        attributes: ['id', 'country'],
        required: false
      },
      {
        model: models.designation,
        attributes: ['id', 'designation'],
        required: false
      },
      {
        model: models.employeeLogin,
        attributes: ['id', 'email', 'isAdmin', 'employeeId'],
        required: false
      },
      {
        model: models.empWorkExperience,
        attributes: ['id', 'employeeId', 'company', 'employeeId', 'startYear', 'endYear', 'jobDescription', 'designation'],
        required: false
      },
      {
        model: models.degree,
        attributes: ['degreeName'],
        required: false,
        through: {
          model: models.empDegree,
          attributes: ['instituteName', 'startYear', 'endYear', 'cgpa', 'percentage'],
          required: false
        },
        include: [{
          model: models.degreeLevel,
          attributes: ['degreeLevel'],
          required: false
        }]
      },
      {
        model: models.certification,
        attributes: ['certification'],
        required: false,
        through: {
          model: models.empCertifications,
          attributes: ['title', 'organization', 'location', 'completionDate'],
          required: false
        }
      },
      {
        model: models.skill,
        attributes: ['skill'],
        required: false,
        through: {
          attributes: []
        }
      }],
    offset,
    limit,
    distinct: true
  })
  return employees
}
exports.getEmployee = async (employeeId) => {
  const employee = await models.employee.findByPk(employeeId, {

    include: [
      {
        model: models.gender,
        attributes: ['id', 'gender']
      },
      {
        model: models.city,
        attributes: ['id', 'city']
      },
      {
        model: models.country,
        attributes: ['id', 'country']
      },
      {
        model: models.designation,
        attributes: ['id', 'designation']
      },
      {
        model: models.employeeLogin,
        attributes: ['email']
      },
      {
        model: models.empWorkExperience,
        attributes: ['id', 'employeeId', 'company', 'employeeId', 'startYear', 'endYear', 'jobDescription', 'designation']
      },
      {
        model: models.degree,
        attributes: ['id', 'degreeName'],
        through: {
          model: models.empDegree,
          attributes: ['id', 'instituteName', 'startYear', 'endYear', 'cgpa', 'percentage']
        },
        include: [{
          model: models.degreeLevel,
          attributes: ['id', 'degreeLevel']
        }]
      },
      {
        model: models.certification,
        attributes: ['id', 'certification'],
        through: {
          model: models.empCertifications,
          attributes: ['id', 'title', 'organization', 'location', 'completionDate']
        }
      },
      {
        model: models.skill,
        attributes: ['id', 'skill'],
        through: {
          attributes: []
        }
      }],
    order: [
      [models.skill, 'id', 'ASC'],
      [models.empWorkExperience, 'id', 'ASC']
    ]
  })
  return employee
}
exports.getEmpBasicInfo = async () => {
  const employees = await models.employee.findAll({
    include: [
      {
        model: models.gender,
        attributes: ['id', 'gender']
      },
      {
        model: models.designation,
        attributes: ['id', 'designation']
      }
    ],
    attributes: ['id', 'firstName', 'lastName', 'description', 'image', 'contactNumber']
  })
  return employees
}
// returns the count of employees for specific skill
exports.getEmployeeCount = async () => {
  const emp = await models.employee.findAndCountAll({
    group: 'designationId',
    attributes: ['designationId'],
    include: [{
      model: models.designation,
      attributes: ['designation']
    }]
  })
  const empObj = []
  var i
  for (i = 0; i < emp.rows.length; i++) {
    var newElement = {}
    if (emp.rows[i].designation != null) {
      newElement.count = emp.count[i].count
      newElement.designation = emp.rows[i].designation.designation
      empObj.push(newElement)
    }
  }
  return empObj
}
exports.updateEmpBasicInfo = async (data) => {
  var updated = false
  const emp = await models.employee.findByPk(data.empId)
  if (emp) {
    await emp.update({
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      age: data.age,
      genderId: data.genderId,
      address: data.address,
      cityId: data.cityId,
      countryId: data.countryId,
      description: data.description,
      designationId: data.designationId
    })
    updated = true
  }
  return updated
}
exports.signup = async (employeeInfo) => {
  var signup = false
  const email = await findEmail(employeeInfo.email)
  if (!email) {
    const employeeCreated = await models.employee.create({
      firstName: employeeInfo.firstName,
      lastName: employeeInfo.lastName,
      designationId: employeeInfo.designationId
    })
    if (employeeCreated) {
      await employeeCreated.createEmployeeLogin({
        email: employeeInfo.email,
        password: employeeInfo.password,
        isAdmin: employeeInfo.isAdmin
      })
    }
    signup = true
  }
  return signup
}
exports.login = async (credentials) => {
  var login = {
    success: false,
    id: null,
    isAdmin: null,
    token: null
  }
  const emp = await findEmail(credentials.email, { raw: true })

  if (emp) {
    const matched = await validatePassword(credentials.password, emp.password)
    if (matched) {
      const payload = { id: emp.employeeId, isAdmin: emp.isAdmin }
      const token = jwt.sign({ emp: payload, expiresIn: '24h' }, process.env.secret)
      await emp.update({
        token: token
      })
      login.success = true
      login.id = emp.employeeId
      login.isAdmin = emp.isAdmin
      login.token = token
    }
  }
  return login
}
exports.logout = async (token) => {
  var success = false
  const emp = await models.employeeLogin.findOne({ where: { token: token } })
  if (emp.token) {
    await emp.update({
      token: null
    })
    success = true
  }
  return success
}
exports.updateLoginCredentials = async (data) => {
  var changed = false
  const emp = await models.employeeLogin.findOne({ where: { employeeId: data.empId } })
  if (emp) {
    if (data.currentPassword) {
      const matched = await validatePassword(data.currentPassword, emp.password)
      if (!matched) {
        return changed
      }
    }
    await emp.update({
      password: data.password,
      email: data.email ? data.email : emp.email
    })
    changed = true
  }
  return changed
}
exports.uploadImage = async (data) => {
  var uploaded = false
  const emp = await models.employee.findByPk(data.employeeId)
  if (emp) {
    await emp.update({
      image: data.picture
    })
    uploaded = true
  }
  return uploaded
}
exports.deleteEmployee = async (id) => {
  var deleted = false
  const emp = await models.employee.findByPk(id)
  if (emp) {
    await emp.destroy()
    deleted = true
  }
  return deleted
}
