const router = require('express').Router()
const genderController = require('../gender/genderController')

// verifies the incoming token
const verifyToken = require('../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with certificates
*/
router.route('/gender/getGenders').get(verifyToken, genderController.getGenders)
router.route('/gender/getGender/:id').get(verifyToken, genderController.getGender)
router.route('/gender/addGender').post(verifyToken, requireAdmin, genderController.addGender)
router.route('/gender/deleteGender/:id').delete(verifyToken, requireAdmin, genderController.deleteGender)
router.route('/gender/updateGender/:id').patch(verifyToken, requireAdmin, genderController.updateGender)

module.exports = router
