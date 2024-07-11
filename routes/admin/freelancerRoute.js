/**IMPORTS CONFIG =============================================== */
const express = require('express')
const freelancer = express.Router()
const freelancerController = require('../../controllers/admin/freelancerController')
const {authorizeRole} = require('../../middleware/authMiddleware');

//Routes
freelancer.get('/', freelancerController.index);
freelancer.get('/cadastrar', authorizeRole('admin'), freelancerController.create);
freelancer.post('/enviar_cadastro', freelancerController.coletionUpload, freelancerController.store);
freelancer.post('/verificar_email', freelancerController.coletionUpload, freelancerController.emailVerification);
freelancer.get('/eliminar/:id', authorizeRole('admin'), freelancerController.destroy);
freelancer.get('/baixar_bi/:id', freelancerController.downloadBI);
freelancer.get('/baixar_cv/:id', freelancerController.downloadCV);
freelancer.get('/atualizar/:id', authorizeRole('admin'),  freelancerController.updateView);
freelancer.put('/update/:id', 
    authorizeRole('admin'),
    freelancerController.imgUpRout,
    freelancerController.update,
);

/**EXPORT =========================================================== */
module.exports = freelancer
