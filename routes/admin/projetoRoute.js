/**IMPORTS CONFIG =============================================== */
const express = require('express')
const projeto = express.Router()
const projetoController = require('../../controllers/admin/projetoController')
const {isLogged, checkUsser} = require('../../middleware/authMiddleware')


//Routes 
// projeto.get('*', checkUsser)
projeto.get('/', projetoController.index)
projeto.get('/novo_projeto', projetoController.create)
projeto.post('/criar', projetoController.imageUpload, projetoController.store)
projeto.get('/search', projetoController.search)
projeto.get('/detalhes/:id', projetoController.details)
projeto.get('/inscrever/:id', projetoController.applayToProject)
projeto.get('/meuprojeto', projetoController.myProjects) 
projeto.get('/meuprojeto/update/:id', projetoController.update)  
projeto.put('/meuprojeto/update/:id', projetoController.updateProject, projetoController.imageUpload) 

/**EXPORT =========================================================== */   
module.exports = projeto 