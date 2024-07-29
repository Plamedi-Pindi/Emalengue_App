/**IMPORTS CONFIG =============================================== */
const express = require('express')
const curso = express.Router()
const cursoRoute = require('../../controllers/site/cursoController')

//Routs
curso.get('/', cursoRoute.index);
//Routs
curso.get('/search', cursoRoute.search);
//
curso.get('/detalhes/:id', cursoRoute.detail);
//
curso.get('/detalhes/acompanhar/:id', cursoRoute.playlistShow);
//
curso.get('/pesquisarCategoria/:id', cursoRoute.categorySearch);


/**EXPORT CONFIG ============================================== */
module.exports = curso