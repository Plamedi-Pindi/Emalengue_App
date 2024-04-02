'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
 
    await queryInterface.createTable('freelancerprojetos', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      freelancId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'freelancers',
          key: 'id'
        }
      },
      projetId: {
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

    await queryInterface.dropTable('freelancerprojetos');
  }
};
