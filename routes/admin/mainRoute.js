/**IMPORTS CONFIG =============================================== */
const express = require('express')
const main = express.Router()
const mainController = require('../../controllers/admin/mainController')

//Routes
main.get('/', mainController.index)

/**EXPORT =========================================================== */
module.exports = main