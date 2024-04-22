'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //img
    await queryInterface.addColumn('users', 'imagem',
      {
        type: Sequelize.STRING,
        allowNull: true
      });

    //Country
    await queryInterface.addColumn('users', 'pais',
      {
        type: Sequelize.STRING,
        allowNull: true
      });

    //Country
    await queryInterface.addColumn('users', 'provincia',
      {
        type: Sequelize.STRING,
        allowNull: true
      });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('imagem', 'pais', 'provincia');
  }
};
