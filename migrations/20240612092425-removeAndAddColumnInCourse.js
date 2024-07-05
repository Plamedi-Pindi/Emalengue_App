'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cursos', 'cursos_ibfk_1');
    await queryInterface.removeConstraint('cursos', 'cursos_ibfk_2');

    await queryInterface.addConstraint('cursos', {
      fields: ['categoria_id'],
      type: 'foreign key',
      name: 'categoria_id_2',
      references: {
        table: 'categorias',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('cursos', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_id_1',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cursos','categoria_id_2', 'user_id_1' );
  }
};
