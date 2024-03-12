'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('habilidades', {
       id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
      
      });

  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('habilidades');

  }
};
