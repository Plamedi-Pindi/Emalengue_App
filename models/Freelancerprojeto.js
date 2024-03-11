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
    freelancerId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'freelancers',
            key: 'id'
        }
    },
    projetoId: {
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