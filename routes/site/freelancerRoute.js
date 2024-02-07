/**IMPORTS CONFIG =============================================== */
const express = require('express')
const freelancer =express.Router()
//Controllers
const freelancerController = require(`../../controllers/site/freelancerController`)

freelancer.get('/', freelancerController.index)
freelancer.get('/cadastrar', freelancerController.create)

module.exports = freelancer