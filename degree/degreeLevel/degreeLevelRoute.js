const router = require('express').Router()
const degreeLevelController = require('./degreeLevelController')

// verifies the incoming token
const verifyToken = require('../../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with Degree level functionalities
*/

router.route('/degreeLevel/getLevels').get(verifyToken, degreeLevelController.getLevels)
router.route('/degreeLevel/getLevel/:id').get(verifyToken, degreeLevelController.getLevel)
router.route('/degreeLevel/addLevel').post(verifyToken, requireAdmin, degreeLevelController.addLevel)
router.route('/degreeLevel/addWithDegree').post(verifyToken, requireAdmin, degreeLevelController.addWithDegree)
router.route('/degreeLevel/deleteLevel/:id').delete(verifyToken, requireAdmin, degreeLevelController.deleteLevel)
router.route('/degreeLevel/updateLevel/:id').patch(verifyToken, requireAdmin, degreeLevelController.updateLevel)
module.exports = router
