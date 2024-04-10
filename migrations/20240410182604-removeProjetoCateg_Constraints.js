'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.removeConstraint(
    //   'projetocategorias',
    //   'projetocategorias_ibfk_1' 
    // );

    // await queryInterface.removeConstraint(
    //   'projetocategorias',
    //   'projetocategorias_ibfk_2' 
    // );

    // await queryInterface.addConstraint('projetocategorias', {
    //   fields: ['projetoId'],
    //   type: 'foreign key',
    //     name: 'projeto_fk_Id',
    //     references: {
    //       table: 'projetos',
    //       field: 'id',
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    // });

    await queryInterface.addConstraint('projetocategorias', {
      fields: ['categoriaId'],
      type: 'foreign key',
        name: 'categoria_ib_id',
        references: {
          table: 'categorias',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('projetocategorias');
  }
};
