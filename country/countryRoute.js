const router = require('express').Router()
const countryController = require('./countryController')

// verifies the incoming token
const verifyToken = require('../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with country
*/

router.route('/country/getCountries').get(verifyToken, countryController.getCountries)
router.route('/country/:id/getCities').get(verifyToken, countryController.getCities)
router.route('/country/getCountry/:id').get(verifyToken, countryController.getCountry)
router.route('/country/addCountry').post(verifyToken, requireAdmin, countryController.addCountry)
router.route('/country/addCities').post(verifyToken, requireAdmin, countryController.addCities)
router.route('/country/deleteCountry/:id').delete(verifyToken, requireAdmin, countryController.deleteCountry)
router.route('/country/updateCountry/:id').patch(verifyToken, requireAdmin, countryController.updateCountry)

module.exports = router
