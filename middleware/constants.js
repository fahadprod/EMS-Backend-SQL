/* eslint-disable no-template-curly-in-string */
const response = {
  failed: 'Unsuccessful, ',
  success: 'Successful, ',
  interalServer: 'Internal server error, ',
  forbidden: 'Forbidden, ',
  notFound: 'Not found, ',
  badRequest: 'Bad request, ',
  unauthorized: 'unauthorized access.'
}
const token = {
  notToken: 'Token not found.',
  incorrect: 'Incorrect token provided.',
  notEmployee: 'Employee with this token not found.'
}
const statusCodes = {
  badRequest: 400,
  successful: 200,
  created: 201,
  interalServer: 500,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404
}

const success = {
  true: true,
  false: false
}
module.exports = {
  response,
  statusCodes,
  success,
  token
}
