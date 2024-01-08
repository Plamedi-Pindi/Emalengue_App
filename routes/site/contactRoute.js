/**IMPORTS CONFIG =============================================== */
const express = require('express')
const contact = express.Router()
const contactController = require('../../controllers/site/contactController')

contact.get('/', contactController.index)

module.exports = contact