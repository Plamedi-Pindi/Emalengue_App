// Import Config =========================================================================
const db = require('./db')
const Freelancer = require('./Freelancer')
const Habilidade = require('./Habilidade')

const Freelancerhabilidade = db.sequelize.define('freelancerhabilidades', {
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
        },
        unique: false
    },
    freelancerId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'freelancers',
            key: 'id'
        }
    },
},
    )

    Freelancerhabilidade.sync() 
  
module.exports = Freelancerhabilidade