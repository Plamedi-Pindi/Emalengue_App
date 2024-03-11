const Freelancer = require('./Freelancer')
const Projeto = require('./Projeto')
const User = require('./User')


Projeto.belongsToMany(Freelancer, {
    through: 'Freelancerprojetos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'projetoId',
        allowNull: false
    }
})
Freelancer.belongsToMany(Projeto, { 
    through: 'Freelancerprojetos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE', 
    foreignKey: {
        name: 'freelancerId',
        allowNull: false
    }
})

// =========================

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

module.exports = {
    User,
    Freelancer,
    Projeto
}
