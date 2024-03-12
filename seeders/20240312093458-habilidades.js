'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try {

      await queryInterface.bulkInsert('habilidades',
        [
          { name: 'Javascript' },
          { name: 'Python' },
          { name: 'Java' },
          { name: 'PHP' },
          { name: 'CSS' },
          { name: 'C#' },
          { name: 'C++' },
          { name: 'C' },
          { name: 'Swift' },
          { name: 'Go' },
          { name: 'MySQL' },
          { name: 'SQL' },
          { name: 'Ruby' },
          { name: 'CCNA 1' },
          { name: 'CCNA 2' },
          { name: 'CCNA 3' },
          { name: 'CCNP' },
          { name: 'CCIE' },
          { name: 'React js' },
          { name: 'React Native' },
          { name: 'Angular' },
          { name: 'Vue js' },
          { name: 'Express js' },
          { name: 'Laravel' },
          { name: 'Electron' },
        ], {});

    } catch (error) {

    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('habilidades', null, {
      name: 'Electron',
      name: 'Laravel',
      name: 'Express js',
      name: 'Vue js',
      name: 'Angular',
      name: 'React Native',
      name: 'React Native',
      name: 'React js',
      name: 'CCIE',
      name: 'Ruby',
      name: 'CCNA 1',
      name: 'CCNA 2',
      name: 'CCNA 3',
      name: 'CCNP',
      name: 'Javascript',
      name: 'Python',
      name: 'Java',
      name: 'PHP',
      name: 'CSS',
      name: 'C#',
      name: 'C',
      name: 'C++',
      name: 'Swift',
      name: 'Go',
      name: 'SQL',
      name: 'MySQL',
    });
  }
};
