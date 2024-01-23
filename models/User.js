/**IMPORT ========================================================= */
const db = require('./db')


const User = db.sequelize.define('users',{
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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