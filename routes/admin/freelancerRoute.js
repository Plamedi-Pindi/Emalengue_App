/**IMPORTS CONFIG =============================================== */
const express = require('express')
const freelancer = express.Router()
const freelancerController = require('../../controllers/admin/freelancerController')

//Routes
freelancer.get('/', freelancerController.index)
freelancer.get('/cadastrar', freelancerController.create)
freelancer.post('/enviar_cadastro', freelancerController.store)

/**EXPORT =========================================================== */
module.exports = freelancer
