/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
const User = require('../../models/User')
const Habilidade = require('../../models/Habilidade')

//Index
const index = (req, res) => {
    const user = req.user
    Freelancer.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Habilidade, 
                as: 'habilidades',
            }
        ],

    }).then(posts => {

        res.render('site/home/index', {
            title: 'eMaLENGUE',
            freelancers: posts,

            helpers: {
                hello: () => {
                    return "Ola"
                }
            }
        })
    })
}


const error = (req, res) => {
    res.render('site/error')
}

/**EXPORTS CONFIG ============================================== */
module.exports = {
    index,
    error,
}