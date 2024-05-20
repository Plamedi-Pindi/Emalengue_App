'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('transacoes', 'transacoes_ibfk_1');
    await queryInterface.removeConstraint('transacoes', 'transacoes_ibfk_2');
    await queryInterface.removeConstraint('transacoes', 'transacoes_ibfk_3');

    await queryInterface.addConstraint('transacoes', {
      fields: ['user_id'],
      name: 'user_ts_id',
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    
    await queryInterface.addConstraint('transacoes', {
      fields: ['curso_id'],
      name: 'curso_ts_id',
      type: 'foreign key',
      references: {
        table: 'cursos',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('transacoes', {
      fields: ['crowd_id'],
      name: 'crowd_ts_id',
      type: 'foreign key',
      references: {
        table: 'crowdfundings',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transacoes');
  }
};
