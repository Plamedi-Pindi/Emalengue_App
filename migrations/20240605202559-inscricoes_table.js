'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('inscricoes', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    aluno_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'alunos',
            key: 'id',
        },
        constraints:'aluno_id_fk1',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    curso_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cursos',
            key: 'id',
        },
        constraints:'curso_id_fk2',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    data: {
        type: Sequelize.DATEONLY,
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('inscricoes');
  }
};
