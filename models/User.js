/**IMPORT ========================================================= */

const db = require('./db')
 


const User = db.sequelize.define('users', {
    id: {
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
    password: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    pais: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    provincia: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    role: {
        type: db.Sequelize.STRING,
        enum: db.Sequelize.ENUM('admin', 'gerente', 'user', 'freelancer'),
        defaultValue: 'user'
    }
},
    {
        // timestamps: false
    })

// // Association With Freelancer
// User.hasOne(Freelancer, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     foreignKey: {
//         name: 'user_id', 
//          allowNull: false
//     },
// })
// Freelancer.belongsTo(User, {foreignKey: 'user_id'});

// //Association With Projeto
// User.hasMany(Projeto, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     foreignKey: {
//         name: 'user_id',
//         allowNull: false
//     }
// })
// Projeto.belongsTo(User, { foreignKey: 'user_id'});



User.sync() 

module.exports = User

 