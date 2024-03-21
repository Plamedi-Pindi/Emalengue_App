'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('freelancers', 'habilidades');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('freelancers');
  }
};
