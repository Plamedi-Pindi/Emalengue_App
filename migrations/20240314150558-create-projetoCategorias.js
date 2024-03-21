'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('projetocategorias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id'
        }
      },
      projetoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projetos',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }

    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('projetocategorias');
  }
};
