'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('freelancers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      phone: {
        type: Sequelize.STRING,

      },
      especialidade: {
        type: Sequelize.STRING,
      },
      pais: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      habilidades: {
        type: Sequelize.TEXT,
      },
      certificacoes: {
        type: Sequelize.TEXT
      },
      sobre: {
        type: Sequelize.TEXT
      },
      bi: {
        type: Sequelize.TEXT
      },
      cv: {
        type: Sequelize.TEXT
      },
      imagem: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          allowNull: false
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

    await queryInterface.dropTable('freelancers');
  }
};
