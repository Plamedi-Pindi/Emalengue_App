
// Import config ================================================
const db = require('./db'); // DB Config

const Inscricao = db.sequelize.define('inscricoes', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    aluno_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'alunos',
            key: 'id',
        },
        constraints:'aluno_id_fk1',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    curso_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'cursos',
            key: 'id',
        },
        constraints:'curso_id_fk2',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    data: {
        type: db.Sequelize.DATEONLY,
    }
}, 
{
    timestamps: false
});

Inscricao.sync();
module.exports = Inscricao;