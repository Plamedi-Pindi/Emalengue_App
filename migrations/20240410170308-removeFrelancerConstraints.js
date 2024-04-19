'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'freelancerhabilidades',
      'freelancerhabilidades_ibfk_1' 
    );

    await queryInterface.removeConstraint(
      'freelancerhabilidades',
      'freelancerhabilidades_ibfk_2' 
    );

 
    await queryInterface.addConstraint('freelancerhabilidades', {
      fields: ['freelancerId'],
      type: 'foreign key',
        name: 'freelancerId',
        references: {
          table: 'freelancers',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('freelancerhabilidades', {
      fields: ['habilidadeId'],
      type: 'foreign key',
        name: 'habilidadeId',
        references: {
          table: 'habilidades',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('freelancerhabilidades');
  }
};
