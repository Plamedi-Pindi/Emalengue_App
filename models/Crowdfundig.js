// Import config ================================================
const db = require('./db'); // DB Config

const Crowdfunding = db.sequelize.define('crowdfundings', {
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
    duracao: {
        type: db.Sequelize.DATEONLY,
        allowNull: false,
    },
    valor_meta: {
        type: db.Sequelize.FLOAT,
        allowNull: false,
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    local: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    link: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    curso_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'cursos',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    },
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'cursos',
            key: 'id',
        },
        onDelete: 'SET NULL',
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
    estado: {
        type: db.Sequelize.STRING,
        enum: db.Sequelize.ENUM('valido', 'invalido'),
        defaultValue: 'valido'
    },
    img: {
        type: db.Sequelize.STRING
    }
},
    {
        timestamps: false,
    })

Crowdfunding.sync()

module.exports = Crowdfunding
