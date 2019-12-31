/* eslint-disable no-path-concat */
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const models = require('./database/models')
var fileupload = require("express-fileupload");

const cityRoutes = require('./city/cityRoute')
const designationRoutes = require('./designation/designationRoutes')
const countryRoutes = require('./country/countryRoute')
const genderRoutes = require('./gender/genderRoute')
const degreeLevelRoutes = require('./degree/degreeLevel/degreeLevelRoute')
const degreeRoutes = require('./degree/degreeRoute')
const certificateRoutes = require('./certification/certificationRoutes')
const skillRoutes = require('./skill/skillRoutes')
const empRoutes = require('./employee/employeeRoutes')

require('dotenv').config()
const port = process.env.port

// database connection
models.sequelize.sync({ force: false }).then(() => {
  server.use(bodyParser.json())
  server.get('/', (req, res, next) => {
    res.status(200).send('EMS- BACKEND Implemented with MYSQL')
  })
  //used to workaround with multipart form data. // while uploading image
  server.use(fileupload());
  server.use(express.json())
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin,x-auth-token,X-Requested-With, Content-Type, Accept')
    next()
  })
  server.use(bodyParser.json())
  server.use(cors())

  // using all rotues
  server.use(designationRoutes)
  server.use(cityRoutes)
  server.use(countryRoutes)
  server.use(genderRoutes)
  server.use(degreeLevelRoutes)
  server.use(degreeRoutes)
  server.use(certificateRoutes)
  server.use(skillRoutes)
  server.use(empRoutes)
  server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })
})
module.exports = server
