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
        enum: db.Sequelize.ENUM('admin', 'user', 'freelancer'),
        defaultValue: 'user'
    }
})

//Creir um admin por default
// const password = '12345678'
// const encrypted = bcrypt1.hash(password, 10)
// console.log(encrypted);

// User.create({
//     id:1,
//     nome: 'Admim',
//     email: 'Admin@gmail.com',
//     password: encrypted,
//     role: 'admin'
// })


//  User.sync({force: true})

module.exports = User