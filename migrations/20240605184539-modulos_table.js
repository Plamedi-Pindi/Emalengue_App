'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modulos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      playlist: {
        type: Sequelize.STRING,
        allowNull: true,
    },
      cusro_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cursos',
          key: 'id',
        },
        constraints: 'curso_id_fk1',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modulos');
  }
};
