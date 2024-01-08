/**IMPORTS CONFIG ==================================================== */
const express = require('express')
const register = express.Router()
const registerControllet = require('../../controllers/auth/registerController')

// Route
register.get('/', registerControllet.index)

/**EXPORT ================================================================ */
module.exports = register