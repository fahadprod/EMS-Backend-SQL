const router = require('express').Router()
const employeeController = require('./employeeController')
const employeeSkillController = require('./employeeSkill/empSkillController')
const employeeDegreeController = require('./employeeDegree/empDegreeController')
const employeeCertificateController = require('./employeeCertification/empCertificationController')
const employeeWorkExpController = require('./employeeWorkExperience/empWorkExpController')
// verifies the incoming token
const verifyToken = require('../middleware/verifyToken')
// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

// read/get routes
router.route('/employee/getEmployees')
  .get(verifyToken, employeeController.getEmployees)
router.route('/employee/getEmpBasicInfo')
  .get(verifyToken, employeeController.getEmpBasicInfo)
router.route('/employee/getByName')
  .post(verifyToken, employeeController.getEmployeeByName)
router.route('/employee/getEmployee/:id')
  .get(verifyToken, employeeController.getEmployee)
router.route('/employee/getEmpSkillCount')
  .get(verifyToken, requireAdmin, employeeSkillController.getEmployeeCount)
router.route('/employee/getEmpDesignationCount')
  .get(employeeController.getEmployeeCount)

// signup,login,logout routes
router.route('/employee/signup')
  .post(verifyToken, requireAdmin, employeeController.signUp)
router.route('/employee/login')
  .post(employeeController.login)
router.route('/employee/logout')
  .post(verifyToken, employeeController.logout)
router.route('/employee/:id/deleteEmployee')
  .delete(verifyToken, requireAdmin, employeeController.deleteEmployee)

// add routes
router.route('/employee/:id/addDegree')
  .post(verifyToken, employeeDegreeController.addDegree)
router.route('/employee/:id/editSkill')
  .post(verifyToken, employeeSkillController.editSkill)
router.route('/employee/:id/addCertificate')
  .post(verifyToken, employeeCertificateController.addCertificate)
router.route('/employee/:id/addWorkExperience')
  .post(verifyToken, employeeWorkExpController.addWorkExp)

// update routes
router.route('/employee/:id/updateBasicInfo')
  .patch(verifyToken, employeeController.updateEmpBasicInfo)
router.route('/employee/:id/updateDegree/:empDegreeId')
  .patch(verifyToken, employeeDegreeController.updateDegree)
router.route('/employee/:id/updateCertificate/:empCertificateId')
  .patch(verifyToken, employeeCertificateController.updateCertificate)
router.route('/employee/:id/updateWorkExperience/:expId')
  .patch(verifyToken, employeeWorkExpController.updateWorkExp)

// update Login Credentials route
router.route('/employee/:id/updateLoginCredentials')
  .patch(verifyToken, employeeController.updateLoginCredentials)

// delete routes
router.route('/employee/:id/deleteDegree/:empDegreeId')
  .delete(verifyToken, employeeDegreeController.deleteDegree)
router.route('/employee/:id/deleteCertificate/:empCertificateId')
  .delete(verifyToken, employeeCertificateController.deleteCertificate)
router.route('/employee/:id/deleteWorkExperience/:expId')
  .delete(verifyToken, employeeWorkExpController.deleteWorkExp)

// upload image route
router.route('/employee/:id/uploadImage')
  .post(verifyToken, employeeController.uploadImage)

module.exports = router
