const db = require('./db'); // DB Config

const Transacao = db.sequelize.define('transacoes', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    valor: {
        type: db.Sequelize.FLOAT,
        allowNull: false,
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    comprovativo: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    tipo_transacao: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    metodo_pagamento: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    estado: {
        type: db.Sequelize.STRING,
        enum: db.Sequelize.ENUM('pendente', 'confirmado', 'cancelado'),
        defaultValue: 'pendente'
    },
    data: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    hora: {
        type: db.Sequelize.TIME,
        allowNull: false
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
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    crowd_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
},
{
    timestamps: false,
});

Transacao.sync()

module.exports = Transacao
