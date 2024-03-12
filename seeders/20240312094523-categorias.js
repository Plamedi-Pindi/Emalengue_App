'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('categorias', [
      { name: 'Segurança da Informação' },
      { name: 'Análise de Dados' },
      { name: 'Gestão de Projetos' },
      { name: 'Análise de UX' },
      { name: 'Programação' },
      { name: 'Desenvolvimento Web' },
      { name: 'Desenvolvimento de Software' },
      { name: 'Desenvolvimento Mobile' },
      { name: 'Desenvolvimento Desktop' },
      { name: 'Redes de computador' },
      { name: 'Análise de Suporte' },
      { name: 'Análise de Segurança de Redes' },
      { name: 'Administração de Redes' },
      { name: 'Administração de Banco de Dados' },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {
       name: 'Segurança da Informação' ,
       name: 'Análise de Dados' ,
       name: 'Gestão de Projetos' ,
       name: 'Análise de UX' ,
       name: 'Programação' ,
       name: 'Desenvolvimento Web' ,
       name: 'Desenvolvimento de Software' ,
       name: 'Desenvolvimento Mobile' ,
       name: 'Desenvolvimento Desktop' ,
       name: 'Redes de computador' ,
       name: 'Análise de Suporte' ,
       name: 'Análise de Segurança de Redes' ,
       name: 'Administração de Redes' ,
       name: 'Administração de Banco de Dados' ,

    });
  }
};
