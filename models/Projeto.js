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
    categoria: {
        type: db.Sequelize.INTEGER,
    },
    habilidade: {
        type: db.Sequelize.INTEGER,
    },
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
    }

})

// Projeto.belongsToMany(Freelancer, {
//     through: 'Freelancerprojetos', 
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     foreignKey: {
//         name: 'projetoId',
//         allowNull: false
//     }
// })
// Freelancer.belongsToMany(Projeto, { 
//     through: 'Freelancerprojetos',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE', 
//     foreignKey: {
//         name: 'freelancerId',
//         allowNull: false
//     }
// }) 

 
Projeto.sync()

/**EXPORTS ============================================ */ 
module.exports = Projeto