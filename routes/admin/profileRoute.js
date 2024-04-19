// Import Config ===============================================================
const profileController = require('../../controllers/admin/profileController');
const express = require('express');
const Profile = express.Router();

Profile.get('/:id', profileController.index);
Profile.put('/email_verification/:id', profileController.emailVerification)
Profile.put('/update_profile/:id', profileController.update)


module.exports = Profile