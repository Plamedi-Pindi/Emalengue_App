// Import Config =========================================================================
const db = require('./db')
const Projeto = require('./Projeto')
const Habilidade = require('./Habilidade')

const ProjetoHabilidade = db.sequelize.define('projetohabilidades', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    habilidadeId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'habilidades',
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

    ProjetoHabilidade.sync() 
  
module.exports = ProjetoHabilidade