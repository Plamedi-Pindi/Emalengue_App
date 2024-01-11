/**IMPORTS CONFIG ========================================================= */
//DB connection
const db = require('./db')

const Freelancer = db.sequelize.define('freelancers', {
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }, 
    email:{
        type: db.Sequelize.STRING,
        unique:true,
    },
    senha:{
        type: db.Sequelize.STRING,
        // unique:true
    },
    pais:{
        type: db.Sequelize.STRING
    },
    provincia:{
        type: db.Sequelize.STRING
    },
    habilidades:{
        type: db.Sequelize.TEXT,
    },
    certificacoes:{ 
        type: db.Sequelize.TEXT
    },
    sobre:{
        type: db.Sequelize.TEXT
    },
    bi:{
        type: db.Sequelize.TEXT
    },
    cv:{
        type: db.Sequelize.TEXT
    },
    imagem: {
        type: db.Sequelize.STRING
    }

})

//Sync data in DB
// Freelancer.sync({force:true})

module.exports = Freelancer