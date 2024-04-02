/**IMPORTS CONFIG ========================================================= */
//DB connection
const db = require('./db')

const Freelancer = db.sequelize.define('freelancers', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    phone: {
        type: db.Sequelize.STRING,
    },
    especialidade: {
        type: db.Sequelize.STRING,
    },
    pais: {
        type: db.Sequelize.STRING
    },
    provincia: {
        type: db.Sequelize.STRING
    },
    certificacoes: {
        type: db.Sequelize.TEXT
    },
    sobre: {
        type: db.Sequelize.TEXT
    },
    bi: {
        type: db.Sequelize.TEXT
    },
    cv: {
        type: db.Sequelize.TEXT
    },
    imagem: {
        type: db.Sequelize.STRING
    },
    user_id: {
        type: db.Sequelize.INTEGER,   
        references: {
            model: 'users',
            key: 'id',
            allowNull: false
        }
    },

})

//=====================================



//===================================================
// Association With Freelancer
// User.hasOne(Freelancer, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     foreignKey: {
//         name: 'user_id', 
//          allowNull: false
//     },
// })
// Freelancer.belongsTo(User, {foreignKey: 'user_id'});


//Sync data in DB
Freelancer.sync()

module.exports = Freelancer