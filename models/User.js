/**IMPORT ========================================================= */
const db = require('./db')
// const bcrypt1 = require('bcrypt')

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
    },
    role:{
        type: db.Sequelize.STRING,
        enum: db.Sequelize.ENUM('admin', 'gerente', 'user', 'freelancer'),
        defaultValue: 'user'
    }
},
{
    // timestamps: false
})


 User.sync()

module.exports = User