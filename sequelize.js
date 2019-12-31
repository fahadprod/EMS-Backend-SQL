const Sequelize = require('sequelize')
const models = require('./database/models')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PWD, {
  dialect: 'mysql'
})

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!')
  })

module.exports = models
