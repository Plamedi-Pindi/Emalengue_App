
// Import config ================================================
const db = require('./db'); // DB Config

const Modulo = db.sequelize.define('modulos', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    ordem: {
        type: db.Sequelize.INTEGER,
        allowNull: true,
    },
    playlist: {
        type: db.Sequelize.STRING,
        allowNull: true,
    },
    cusro_mod_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'cursos',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    timestamps: false
});

Modulo.sync();
module.exports = Modulo;