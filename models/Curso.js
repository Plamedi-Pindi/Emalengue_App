// Import config ================================================
const db = require('./db');
const pagination = require('sequelize-paginate');

const Curso = db.sequelize.define('cursos', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    playlist: {
        type: db.Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: db.Sequelize.STRING,
        allowNull: true,
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    estado: {
        type: db.Sequelize.STRING,
        enum: db.Sequelize.ENUM('normal', 'crowdfunding',),
        defaultValue: 'normal'
    },
    categoria_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'categorias',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    custo: {
        type: db.Sequelize.FLOAT,
        allowNull: true
    },
    nivel: {
        type: db.Sequelize.STRING,
        allowNull: true
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
        timestamps: false,
    })

  
    pagination.paginate(Curso);

Curso.sync()

module.exports = Curso;