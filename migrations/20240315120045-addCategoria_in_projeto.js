'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('projetos', 'categoria_Id', {
     
        type: Sequelize.INTEGER,
       }).then( async () => {

      await queryInterface.addConstraint('projetos', {
        fields: ['categoria_Id'],
        type: 'foreign key',
        name: 'categoria_Id',
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
