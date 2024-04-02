// Import config ============================================
const express = require('express')
const crowdfunder = express.Router()
const crowdfunderController = require('../../controllers/site/crowdfundigController')

crowdfunder.get('/', crowdfunderController.index)


module.exports = crowdfunder
