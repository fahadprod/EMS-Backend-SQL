const constants = require('../middleware/constants')
const created = (res, data) => {
  res.status(constants.statusCodes.created).json({
    success: constants.success.true,
    message: constants.response.success + data
  })
}
const retrieved = (res, data) => {
  res.status(constants.statusCodes.successful).json({
    success: constants.success.true,
    message: constants.response.success,
    data
  })
}
const success = (res, data) => {
  res.status(constants.statusCodes.successful).json({
    success: constants.success.true,
    message: constants.response.success + data
  })
}
const badRequest = (res, data) => {
  res.status(constants.statusCodes.badRequest).json({
    success: constants.success.false,
    message: data
  })
}
const unauthorized = (res, data) => {
  res.status(constants.statusCodes.unauthorized).json({
    success: constants.success.false,
    message: constants.response.unauthorized + data
  })
}
const forbidden = (res, data) => {
  res.status(constants.statusCodes.forbidden).send({
    message: constants.response.forbidden + data
  })
}
const notFound = (res, data) => {
  res.status(constants.statusCodes.notFound).json({
    success: constants.success.false,
    message: constants.response.notFound + data
  })
}
const internalServerError = (res, data) => {
  res.status(constants.statusCodes.interalServer).json({
    success: constants.success.false,
    message: constants.response.failed + data
  })
}
const Login = (res, message ,data) => {
  res.status(200).json({
    success: constants.success.true,
    message: message,
    id: data.id,
    isAdmin: data.isAdmin,
    token: data.token
  })
}
module.exports = {
  success,
  created,
  badRequest,
  notFound,
  retrieved,
  internalServerError,
  unauthorized,
  forbidden,
  Login
}
