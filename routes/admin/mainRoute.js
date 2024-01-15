/**IMPORTS CONFIG =============================================== */
const express = require('express')
const main = express.Router()
const mainController = require('../../controllers/admin/mainController')
const {requireAuth, checkUsser} = require('../../middleware/authMiddleware')

//Routes
main.get('*', checkUsser)
main.get('/', requireAuth,  mainController.index)

/**EXPORT =========================================================== */
module.exports = main