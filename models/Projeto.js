/**IMPORTS ============================================ */
// const Projeto = require('../routes/admin/projetoRoute')

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
    image: {
        type: db.Sequelize.STRING,
    },
    descricao: {
        type: db.Sequelize.TEXT,
    },
    prazo: {
        type: db.Sequelize.DATEONLY,
    },
    
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
    },
    categoria_Id: {
        type: db.Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id',
        }
    }

})


 
Projeto.sync()

/**EXPORTS ============================================ */ 
module.exports = Projeto