const router = require('express').Router()
const degreeController = require('./degreeController')
// verifies the incoming token
const verifyToken = require('../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with Degree functionalities
*/

router.route('/degree/getDegrees').get(verifyToken, degreeController.getDegrees)
router.route('/degree/getDegree/:id').get(verifyToken, degreeController.getDegree)
router.route('/degree/addDegree').post(verifyToken, requireAdmin, degreeController.addDegree)
router.route('/degree/deleteDegree/:id').delete(verifyToken, requireAdmin, degreeController.deleteDegree)
router.route('/degree/updateDegree/:id').patch(verifyToken, requireAdmin, degreeController.updateDegree)

module.exports = router
