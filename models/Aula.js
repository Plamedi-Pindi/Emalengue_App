// Import config ================================================
const db = require('./db'); // DB Config

const Aula = db.sequelize.define('aulas', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    link: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    curso_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'cursos',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    data: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    hora: {
        type: db.Sequelize.TIME,
        allowNull: false
    },
},
{
    timestamps: true,
})

Aula.sync()

module.exports = Aula
