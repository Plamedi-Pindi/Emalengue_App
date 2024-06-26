'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cursos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      estado: {
        type: Sequelize.STRING,
        enum: Sequelize.ENUM('normal', 'crowdfunding',),
        defaultValue: 'normal'
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      custo: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: true
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },


    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cursos');
  }
};
