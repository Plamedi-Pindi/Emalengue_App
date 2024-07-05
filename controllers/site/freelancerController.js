/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
const User = require('../../models/User')
const Habilidade = require('../../models/Habilidade')




//index ==============================================================
const index = (req, res) => {
    Freelancer.findAll({
        include: [
            {
                model: User
            },
        ]
    }).then(posts => {
        res.render('site/freelancer/index', {
            Freelancers: posts,
            title: 'eMaLENGUE | Freelancers',
        })
    })
}

//Create ==============================================================
const  create = async (req, res) => {
    await Habilidade.findAll().then( habilidades => {
        res.render('site/freelancer/create/create', {
            title: 'eMALENGUE | Novo Freelancer',
            habilidades: habilidades
        })
    })
}



/**EXPORTS CONFIG ============================================== */
module.exports = {
    index,
    create
}