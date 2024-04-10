'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'projetohabilidades',
      'projetohabilidades_ibfk_1' 
    );

    await queryInterface.removeConstraint(
      'projetohabilidades',
      'projetohabilidades_ibfk_2' 
    );

    await queryInterface.addConstraint('projetohabilidades', {
      fields: ['projetoId'],
      type: 'foreign key',
        name: 'projeto_Id',
        references: {
          table: 'projetos',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('projetohabilidades', {
      fields: ['habilidadeId'],
      type: 'foreign key',
        name: 'habilidade_Id',
        references: {
          table: 'habilidades',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projetohabilidades');
  }
};
