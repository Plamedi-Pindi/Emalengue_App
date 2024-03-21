'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('projetos', 'habilidade');
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('projetos');
  }
};
