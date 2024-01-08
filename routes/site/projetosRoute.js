/** IMPORTS CONFIG =========================================================== */
const express = require('express')
const projeto = express.Router()
const projetoController = require('../../controllers/site/projetosController')


//Route
projeto.get('/publicarprojeto', projetoController.publicarPojeto)



/**EXPORT ==================================================================== */
module.exports = projeto
