// // Import config =======================================================
const db = require('./db');

const Habilidade = db.sequelize.define('habilidades', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull:false,
        unique: true
        
    },
},
{
    timestamps: false
});

Habilidade.sync()

module.exports = Habilidade


