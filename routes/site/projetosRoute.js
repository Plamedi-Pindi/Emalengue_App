/** IMPORTS CONFIG =========================================================== */
const express = require('express')
const projeto = express.Router()
const projetoController = require('../../controllers/site/projetosController')
const { checkUsser, isLogged } = require('../../middleware/authMiddleware')


//Route
projeto.get('*', checkUsser)
projeto.get('/publicarprojeto', isLogged, projetoController.publicarPojeto)



/**EXPORT ==================================================================== */
module.exports = projeto
