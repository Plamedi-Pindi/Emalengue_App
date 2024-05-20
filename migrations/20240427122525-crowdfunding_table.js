'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crowdfundings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duracao: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      valor_meta: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      local: {
        type: Sequelize.STRING,
        allowNull: true
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      curso_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cursos',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cursos',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        enum: Sequelize.ENUM('valido', 'invalido'),
        defaultValue: 'valido'
    },
    img: {
        type: Sequelize.STRING
    }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('crowdfundings');
  }
};
