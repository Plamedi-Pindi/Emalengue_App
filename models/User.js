/**IMPORT ========================================================= */
const db = require('./db')

const User = db.sequelize.define('users',{
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    password:{
        type: db.Sequelize.STRING
    }
    
})

// User.sync({force: true})

module.exports = User