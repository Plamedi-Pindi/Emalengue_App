/**IMPORTS ============================================ */
const db = require('./db')

const Projeto = db.sequelize.define('projetos', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: db.Sequelize.TEXT,
    },
    prazo: {
        type: db.Sequelize.DATEONLY,
    },
    categoria: {
        type: db.Sequelize.INTEGER,
    },
    habilidade: {
        type: db.Sequelize.INTEGER,
    }
})

// Projeto.sync({ force: 'true' })


/**EXPORTS ============================================ */
module.exports = Projeto