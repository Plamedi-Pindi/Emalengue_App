/** Import Config ===========================================================*/
const express = require('express');
const cursoController = require('../../controllers/admin/cursoController')
const curso = express.Router()


//Routes ===========================
curso.get('/', cursoController.index);
curso.post('/publicar', cursoController.publicarCurso )



module.exports = curso