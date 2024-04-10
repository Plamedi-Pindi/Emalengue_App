'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('freelancers', 'freelancers_ibfk_1');

    await queryInterface.addConstraint('freelancers', {
      fields: ['user_id'],
      name: 'user_id',
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('freelancers');
  }
};
