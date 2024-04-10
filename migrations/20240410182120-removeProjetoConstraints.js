'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('projetos', 'freelancers_ibfk_1');
    await queryInterface.removeConstraint('projetos', 'categoria_id');
    
    await queryInterface.addConstraint('projetos', {
      fields: ['user_id'],
      name: 'user_fk_Id',
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('projetos', {
      fields: ['categoria_id'],
      name: 'categoria_fk_id',
      type: 'foreign key',
      references: {
        table: 'categorias',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('projetos');
  }
};
