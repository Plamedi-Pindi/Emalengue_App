/**IMPORTS CONFIG =============================================== */
const express = require('express')
const projeto = express.Router()
const projetoController = require('../../controllers/admin/projetoController')


//Routes 
projeto.get('/', projetoController.index)
projeto.get('/novo_projeto', projetoController.create)
projeto.post('/criar', projetoController.imageUpload, projetoController.store)
projeto.get('/search', projetoController.search)
projeto.get('/detalhes/:id', projetoController.details)
projeto.get('/inscrever/:id', projetoController.applayToProject)

/**EXPORT =========================================================== */
module.exports = projeto 