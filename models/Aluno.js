// Import config ================================================
const db = require('./db'); // DB Config

const Aluno = db.sequelize.define('alunos', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        constraints:'user_id_fk1',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ocupacao: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
}
);

Aluno.sync();
module.exports = Aluno;