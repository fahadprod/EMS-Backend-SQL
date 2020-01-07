const constants = require('../middleware/constants')
const response = (code, message, data) => {
  return {
    ResponseHeader: {
      ResponseCode: code,
      ResponseMessage: message
    },
    data
  }
}
const created = (res, data) => {
  res.status(constants.statusCodes.created)
  .json(response(constants.statusCodes.created,constants.response.success))
}
const retrieved = (res, data,message) => {
  res.status(constants.statusCodes.successful)
  .json(response(constants.statusCodes.successful,message,data))
}
const success = (res, data) => {
  res.status(constants.statusCodes.successful)
  .json(response(constants.statusCodes.successful,constants.response.success,data))
}
const badRequest = (res, data) => {
  res.status(constants.statusCodes.badRequest)
  .json(response(constants.statusCodes.badRequest,data))
}
const unauthorized = (res, message) => {
  res.status(constants.statusCodes.unauthorized)
  .json(response(constants.statusCodes.unauthorized,constants.response.unauthorized + message))
}
const forbidden = (res, data) => {
  res.status(constants.statusCodes.forbidden)
  .json(response(constants.statusCodes.forbidden, constants.response.forbidden + data))
}
const notFound = (res, data) => {
  res.status(constants.statusCodes.notFound)
  .json(response(constants.statusCodes.notFound,constants.response.notFound+data))
}
const internalServerError = (res, data) => {
  res.status(constants.statusCodes.interalServer)
  .json(response(constants.statusCodes.interalServer,constants.response.failed + data))
}
const Login = (res, message ,data) => {
  res.status(constants.statusCodes.successful).json(response(constants.statusCodes.successful,message,data))
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
