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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        // unique:true
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
