// Import config =========================================================

const express = require('express')
const google = express.Router()
const googleController = require('../../controllers/auth/googleController')
const {isLogged} = require('../../middleware/authMiddleware')

// google.get('/auth/google', googleController.autehGoogle)
// google.get('/auth/google/callback', googleController.callBack)
google.get('/google/protected', isLogged, googleController.protected)
google.get('/google/failure', googleController.failure)


module.exports = google