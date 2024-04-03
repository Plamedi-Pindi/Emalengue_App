// Import config ============================================
const express = require('express')
const crowdfunder = express.Router()
const crowdfunderController = require('../../controllers/site/crowdfundigController')

crowdfunder.get('/', crowdfunderController.index)
crowdfunder.get('/detalhes', crowdfunderController.details)


module.exports = crowdfunder
