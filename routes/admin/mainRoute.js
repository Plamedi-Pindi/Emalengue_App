/**IMPORTS CONFIG =============================================== */
const express = require('express')
const main = express.Router()
const mainController = require('../../controllers/admin/mainController')
const { checkUsser, isLogged} = require('../../middleware/authMiddleware')

//Routes
main.get('*', isLogged)
main.get('/', mainController.index)

/**EXPORT =========================================================== */
module.exports = main