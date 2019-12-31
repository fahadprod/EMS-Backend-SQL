const router = require('express').Router()
const designationController = require('./designationController')

// verifies the incoming token whether its valid
const verifyToken = require('../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with cities
*/
router.route('/designation/getDesignations').get(verifyToken, designationController.getDesignations)
router.route('/designation/getDesignation/:id').get(verifyToken, designationController.getDesignation)
router.route('/designation/addDesignation').post(verifyToken, requireAdmin, designationController.addDesignation)

router.route('/designation/deleteDesignation/:id').delete(verifyToken, requireAdmin, designationController.deleteDesignation)
router.route('/designation/updateDesignation/:id').patch(verifyToken, requireAdmin, designationController.updateDesignation)

module.exports = router
