const jwt = require('jsonwebtoken')
const models = require('../database/models')
const response = require('../middleware/responses')
const constant = require('../middleware/constants')

const verifyToken = async (req, res, next) => {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) ||
  req.headers['x-auth-token']

  if (!token) {
    // this error is thrown because no token is provided
    response.forbidden(res, constant.token.notToken)
  }
  await jwt.verify(token, process.env.secret, async function (err, decoded) {
    if (err) {
      // wrong token provided
      response.unauthorized(res, constant.token.incorrect)
    }

    var info = jwt.decode(token, { complete: true })
    const user = await models.employeeLogin.findOne({ where: { employeeId: info.payload.emp.id } })
    if (!user) {
      // user with this token not found
      response.notFound(res, constant.token.notEmployee)
    } else if (user.token == null) {
      // user found, but token for this user does not exist in database
      response.notFound(res, constant.token.notToken)
    } else if (user.token !== token) {
      // unauthorized access
      response.unauthorized(res, constant.response.unauthorized)
    } else {
      req.isAdmin = user.isAdmin
      req.id = user.employeeId
      req.token = token
      next()
    }
  })
}
module.exports = verifyToken
