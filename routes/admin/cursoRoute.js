/** Import Config ===========================================================*/
const express = require('express');
const cursoController = require('../../controllers/admin/cursoController')
const curso = express.Router();


// INDEX ========================================================
curso.get('/', cursoController.index);
// NEW COURSE ROUTE =============================================
curso.get('/novocurso', cursoController.addCourseView);
// COURSE DETAILS ROUTE =========================================
curso.get('/detalhes/:id', cursoController.courseDetails);
// COURSE DETAILS ROUTE =========================================
curso.get('/detalhes/acompanhar/:id', cursoController.courseWhatch);
// COURSE DETAILS ROUTE =========================================
curso.get('/detalhes/alunos/:id', cursoController.alunos);
// PUBLISHING NEW COURSE ROUTE ==================================
curso.post('/publicar/:id', cursoController.imgUpload, cursoController.publicarCurso);


module.exports = curso