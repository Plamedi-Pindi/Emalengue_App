/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
const User = require('../../models/User')
//index
const index = (req, res) => {
    Freelancer.findAll({
        include: [{
            model: User
        }]
    }).then(posts => {
        res.render('site/freelancer/index', {
            Freelancers: posts,
            title: 'Freelancers',
        })
    })
}

//Create
const create = (req, res) => {
    res.render('site/freelancer/create/create', {
        title: 'Novo Freelancer'
    }) 
}



/**EXPORTS CONFIG ============================================== */
module.exports = {
    index,
    create
}