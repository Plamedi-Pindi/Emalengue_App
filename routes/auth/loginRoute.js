/**IMPORTS CONFIG ==================================================== */
const express = require('express')
const login = express.Router()
const loginContrroler = require('../../controllers/auth/loginControoler')

// Route
login.get('/login', loginContrroler.index)
login.post('/login/verificacao', loginContrroler.login)
login.get('/logout', loginContrroler.logout)


/**EXPORT ================================================================ */
module.exports = login