'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add column playlist
    await queryInterface.addColumn('cursos', 'playlist', { 
      type: Sequelize.STRING,
      allowNull: true,

    });  
    // Add column image
    await queryInterface.addColumn('cursos', 'image', {
      type: Sequelize.STRING,
      allowNull: true,

    }); 
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('cursos', ['playlist', 'image']);
  }
};
