const router = require('express').Router()
const cityController = require('./cityController')

// verifies the incoming token whether its valid
const verifyToken = require('../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with cities
*/
router.route('/city/getCities').get(verifyToken, cityController.getCities)
router.route('/city/getCity/:id').get(verifyToken, cityController.getCity)

router.route('/city/deleteCity/:id').delete(verifyToken, requireAdmin, cityController.deleteCity)
router.route('/city/updateCity/:id').patch(verifyToken, requireAdmin, cityController.updateCity)

module.exports = router
