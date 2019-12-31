const router = require('express').Router()
const skillController = require('./skillController')
const verifyToken = require('../middleware/verifyToken')
const requireAdmin = require('../middleware/checkForAdmin')

router.route('/skill/getSkills').get(verifyToken, skillController.getSkills)
router.route('/skill/getSkill/:id').get(verifyToken, skillController.getSkill)
router.route('/skill/addSkill').post(verifyToken, requireAdmin, skillController.addSkill)
router.route('/skill/deleteSkill/:id').delete(verifyToken, requireAdmin, skillController.deleteSkill)
router.route('/skill/updateSkill/:id').patch(verifyToken, requireAdmin, skillController.updateSkill)

module.exports = router
