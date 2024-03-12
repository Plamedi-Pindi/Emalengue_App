// Import config ================================================
const db = require('./db');

const Categoria = db.sequelize.define('categorias', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
}, 
{
    timestamps: false,
})


Categoria.sync();

module.exports = Categoria;