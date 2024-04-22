// Imports config
const usersController = require('../../controllers/admin/usersController');
const express = require('express');
const users = express.Router();

users.get('/', usersController.index);
users.get('/remover/:id', usersController.remove);
users.post('/alterar_papel/:id', usersController.changeRole);


module.exports = users
