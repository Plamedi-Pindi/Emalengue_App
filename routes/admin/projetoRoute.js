/**IMPORTS CONFIG =============================================== */
const express = require('express')
const projeto = express.Router()
const projetoController = require('../../controllers/admin/projetoController')

//Routes
projeto.get('/novo_projeto', projetoController.create)
projeto.post('/criar', projetoController.store)

/**EXPORT =========================================================== */
module.exports = projeto