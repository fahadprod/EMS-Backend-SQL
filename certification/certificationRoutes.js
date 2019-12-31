const router = require('express').Router()
const certificationController = require('./certificationController')

// verifies the incoming token
const verifyToken = require('../middleware/verifyToken')

// check from the token if the token holder is admin or not
const requireAdmin = require('../middleware/checkForAdmin')

/*
   below are routes to access the functionalities dealing with certificates
*/
router.route('/certificate/getCertificates').get(verifyToken, certificationController.getCertificates)
router.route('/certificate/getCertificate/:id').get(verifyToken, certificationController.getCertificate)
router.route('/certificate/addCertificate').post(verifyToken, requireAdmin, certificationController.addCertificate)
router.route('/certificate/deleteCertificate/:id').delete(verifyToken, requireAdmin, certificationController.deleteCertificate)
router.route('/certificate/updateCertificate/:id').patch(verifyToken, requireAdmin, certificationController.updateCertificate)

module.exports = router
