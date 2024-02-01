'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const password = "12345678" 
    const encrypted = await bcrypt.hash(password, 10) // Hashed Password 
    try {
      await queryInterface.bulkInsert('users', [{
        nome: 'Admin',
        email: 'admin@gmail.com',
        password: encrypted,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

    } catch(err){
      console.log(err);
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, { email: 'admin@gamil.com' });
  }
};
