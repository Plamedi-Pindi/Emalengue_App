// Import Config =========================================================================
const db = require('./db')
const Projeto = require('./Projeto')
const Freelancer = require('./Freelancer')

const Freelancerprojetos = db.sequelize.define('freelancerprojetos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    freelancId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'freelancers',
            key: 'id'
        }
    },
    projetId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'projetos',
            key: 'id'
        }
    },
},
    )

    Freelancerprojetos.sync() 
  
module.exports = Freelancerprojetos