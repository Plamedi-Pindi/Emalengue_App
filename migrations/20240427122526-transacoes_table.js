'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacoes', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    comprovativo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo_transacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    metodo_pagamento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    estado: {
        type: Sequelize.STRING,
        enum: Sequelize.ENUM('pendente', 'confirmado', 'cancelado'),
        defaultValue: 'pendente'
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false
    },
    curso_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cursos',
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
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },

    crowd_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },


    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transacoes');
  }
};
