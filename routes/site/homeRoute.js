/**IMPORTS CONFIG =============================================== */
const express = require('express')
const home =express.Router()
//Controllers
const homeController = require(`../../controllers/site/homeController`)

home.get('/', homeController.index)

module.exports = home