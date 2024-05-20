// Import config ============================================
const express = require('express')
const crowdfunder = express.Router()
const crowdfunderController = require('../../controllers/site/crowdfundigController')
const { checkUsser, isLogged } = require('../../middleware/authMiddleware');

crowdfunder.get('/', crowdfunderController.index)
crowdfunder.get('/detalhes/:id', crowdfunderController.details)
crowdfunder.post('/apoiar/:id',
    crowdfunderController.fileUpload,
    crowdfunderController.credateApoio,
    isLogged
)


module.exports = crowdfunder
