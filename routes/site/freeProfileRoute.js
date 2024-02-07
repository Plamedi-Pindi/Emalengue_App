/**IMPORTS CONFIG =================================================== */
const express = require('express')
const freeProfile = express.Router()
const freeProfileController = require('../../controllers/site/freelncerProfilController')

//ROUTES
freeProfile.get('/:id', freeProfileController.index)


/**EXPORT ========================================================== */
module.exports = freeProfile 