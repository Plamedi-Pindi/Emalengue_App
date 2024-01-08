/**IMPORTS CONFIG =============================================== */
const express = require('express')
const curso = express.Router()
const cursoRoute = require('../../controllers/site/cursoController')

//Routs
curso.get('/', cursoRoute.index)


/**EXPORT CONFIG ============================================== */
module.exports = curso