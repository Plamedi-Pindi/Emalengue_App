const Freelancer = require('./Freelancer');
const Projeto = require('./Projeto');
const User = require('./User');
const Habilidade = require('./Habilidade');
const Categoria = require('./Categoria');
const ProjetoHabilidade = require('./ProjetoHabilidade');
const Curso = require('./Curso');
const Aula = require('./Aula');
const Transacao = require('./Transacao');
const Crowdfunding = require('./Crowdfundig');
const Modulo = require('./Modulo');
const Telefone = require('./Telefone');
const Aluno = require('./Aluno');
const Inscricao = require("./Inscricao");





// One to One between User and Aluno ============================================================
User.hasOne(Aluno, {
    onDelete: 'Set Null',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'user_id',
        allowNull: false 
    },
})
Aluno.belongsTo(User, { foreignKey: 'user_id' });

// One to One between Cursos and Categoria ============================================================
Categoria.hasOne(Curso, {
    onDelete: 'Set Null',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'categoria_id',
        allowNull: false 
    },
})
Curso.belongsTo(Categoria, { foreignKey: 'categoria_id' });


// Many-To-May between Curso and Alunos Tables =========================
Aluno.belongsToMany(Curso, {
    as: 'cursos',
    through: 'inscricoes',
    onDelete: 'NOT NULL',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'aluno_id',
        allowNull: false
    }
});

Curso.belongsToMany(Aluno, {
    as: 'alunos',
    through: 'inscricoes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'curso_id',
        allowNull: false
    }
});


// Many-To-One between USER and TELEFONE Tables =====================================================

Telefone.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Telefone, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
});

// // Many-To-One between Cursos and Modulo Tables =====================================================

Modulo.belongsTo(Curso, { foreignKey: 'cusro_mod_id' });

Curso.hasMany(Modulo, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'cusro_mod_id',
        allowNull: false
    },
});


// Many-To-May between Projeto and Freelancer Tables =========================================
Projeto.belongsToMany(Freelancer, {
    through: 'freelancerprojetos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'projetId',
        allowNull: false
    }
})
Freelancer.belongsToMany(Projeto, {
    through: 'freelancerprojetos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'freelancId',
        allowNull: false
    }
})

// Many-To-May between Projeto and Habilidade Tables =========================
Projeto.belongsToMany(Habilidade, {
    as: 'habilidades',
    through: 'projetohabilidades',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'projetoId',
        allowNull: false
    }
})

Habilidade.belongsToMany(Projeto, {
    as: 'projetos',
    through: 'projetohabilidades',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'habilidadeId',
        allowNull: false
    }
})

// // Many-To-One between Projeto and Categoria Tables =====================================================

Projeto.belongsTo(Categoria, { foreignKey: 'categoria_Id' });

Categoria.hasMany(Projeto, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'categoria_Id',
        allowNull: false
    }
})

// Many-To-One between Cursos and Categoria Tables =====================================================
Curso.belongsTo(Categoria, { foreignKey: 'categoria_Id' });

Categoria.hasMany(Projeto, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'categoria_Id',
    }
})

// // Many-To-One between Cursos and User Tables =====================================================
Curso.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.hasMany(Curso, {
    foreignKey: {
        name: 'categoria_Id',
    }
})

// Many-To-One between Cursos and Aula Tables =====================================================

Aula.belongsTo(Curso, {
    foreignKey: { name: 'curso_id', as: 'curso_id' },

    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Curso.hasMany(Aula, {

    foreignKey: {
        name: 'curso_id',
    }
})

// Many-To-One between Cursos and Transacoes Tables =====================================================

Transacao.belongsTo(Curso, {
    foreignKey: { name: 'curso_id' },

    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Curso.hasMany(Transacao, {

    foreignKey: {
        name: 'curso_id',
    }
})


// Many-To-One between Transacao and User Tables =====================================================

Transacao.belongsTo(User, {
    foreignKey: { name: 'user_id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

User.hasMany(Transacao, {
    foreignKey: {
        name: 'user_id',
    }
})

// Many-To-One between Crowdfunding and Transacoes Tables =====================================================

Transacao.belongsTo(Crowdfunding, {
    foreignKey: { name: 'crowd_id' },

    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Crowdfunding.hasMany(Transacao, {

    foreignKey: {
        name: 'crowd_id',
    }
})

// Many-To-One between Crowdfunding and User Tables =====================================================

Crowdfunding.belongsTo(User, {
    foreignKey: { name: 'user_id' },

    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

User.hasMany(Crowdfunding, {

    foreignKey: {
        name: 'user_id',
    }
})



// ===========================================================================

// Association With Freelancer
User.hasOne(Freelancer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
})
Freelancer.belongsTo(User, { foreignKey: 'user_id' });

//Association With Projeto
User.hasMany(Projeto, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})
Projeto.belongsTo(User, { foreignKey: 'user_id' });

// Many-To-May between Freelancer and Habilidade Tables =========================
Freelancer.belongsToMany(Habilidade, {
    as: 'habilidades',
    through: 'freelancerhabilidades',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'freelancerId',
        allowNull: false
    }
})

Habilidade.belongsToMany(Freelancer, {
    as: 'freelancer',
    through: 'freelancerhabilidades',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'habilidadeId',
        allowNull: false
    }
})






module.exports = {
    User,
    Freelancer,
    Projeto
}
