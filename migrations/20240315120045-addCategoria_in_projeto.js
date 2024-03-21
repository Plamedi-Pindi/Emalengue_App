'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('projetos', 'categoriaId', {
     
        type: Sequelize.INTEGER,
       }).then( async () => {

      await queryInterface.addConstraint('projetos', {
        fields: ['categoriaId'],
        type: 'foreign key',
        name: 'categoriaId',
        references: {
          table: 'categorias',
          field: 'id',
          allowNull: true,
        }
      });

    });

  },
    

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projetos');
  }
};
