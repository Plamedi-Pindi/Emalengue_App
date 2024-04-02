const Freelancer = require('./Freelancer')
const Projeto = require('./Projeto')
const User = require('./User')
const Habilidade = require('./Habilidade')
const Categoria = require('./Categoria')
const ProjetoHabilidade = require('./ProjetoHabilidade')
 

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

Projeto.belongsTo(Categoria, { foreignKey: 'categoria_Id'});
 
Categoria.hasMany(Projeto, { 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE', 
    foreignKey: {
        name: 'categoria_Id',
        allowNull: false
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
Freelancer.belongsTo(User, {foreignKey: 'user_id'});

//Association With Projeto
User.hasMany(Projeto, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})
Projeto.belongsTo(User, { foreignKey: 'user_id'});

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
