/** Import Config ===========================================================*/
const express = require('express');
const cursoController = require('../../controllers/admin/cursoController')
const curso = express.Router()


//Routes ===========================
curso.get('/', cursoController.index);



module.exports = curso