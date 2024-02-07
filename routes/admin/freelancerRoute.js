/**IMPORTS CONFIG =============================================== */
const express = require('express')
const freelancer = express.Router()
const freelancerController = require('../../controllers/admin/freelancerController')

//Routes
freelancer.get('/', freelancerController.index)
freelancer.get('/cadastrar', freelancerController.create)
freelancer.post('/enviar_cadastro', freelancerController.coletionUpload, freelancerController.store)
freelancer.get('/eliminar/:id', freelancerController.destroy)
freelancer.get('/baixar_bi/:id', freelancerController.downloadBI)
freelancer.get('/baixar_cv/:id', freelancerController.downloadCV)

/**EXPORT =========================================================== */
module.exports = freelancer
