'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('crowdfundings', 'crowdfundings_ibfk_1');
    await queryInterface.removeConstraint('crowdfundings', 'crowdfundings_ibfk_2');

    await queryInterface.addConstraint('crowdfundings', {
      fields: ['user_id'],
      name: 'user_cd_id',
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE', 
    });
    
    await queryInterface.addConstraint('crowdfundings', {
      fields: ['curso_id'],
      name: 'curso_cd_id',
      type: 'foreign key',
      references: {
        table: 'cursos',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('crowdfundings');
  }
};
