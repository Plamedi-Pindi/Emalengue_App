const express = require('express');
const crowdfundig = express.Router();
const crowdfundigController = require('../../controllers/admin/crowdfundingController');

// Main route
crowdfundig.get('/', crowdfundigController.index);
// Route to publish crowdfunding
crowdfundig.get('/novoCrowdfunding', crowdfundigController.createView);
// Route to Submet data to server
crowdfundig.post('/criar/:id', crowdfundigController.imageUpload, crowdfundigController.create);
// Route to Show crowdfunding details
crowdfundig.get('/detalhes/:id', crowdfundigController.details);
// Route to Delete a crowdfuding
crowdfundig.get('/deleteCrowdfundig/:id', crowdfundigController.deleteCrowfunding);


module.exports = crowdfundig;