/** Import Config ===========================================================*/
const express = require('express');
const cursoController = require('../../controllers/admin/cursoController')
const curso = express.Router();


// INDEX ========================================================
curso.get('/', cursoController.index);
// SEARCH ========================================================
curso.get('/pesquisa/:id', cursoController.searching);
// SEARCH ========================================================
curso.get('/deletar/:id', cursoController.courseDelete);
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
// ENROL TO COURSE ROUTE ==================================
curso.post('/inscrever/:user/:course', cursoController.enrol);
// UPDATE A COURSE ROUTE ==================================
curso.get('/atualizar/:id', cursoController.cursoUpdate);
// UPDATE A COURSE ROUTE ==================================
curso.put('/atualizar/send/:id', cursoController.imgUpload2, cursoController.updatePut);


module.exports = curso