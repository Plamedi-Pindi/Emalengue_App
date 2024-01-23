/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')

//Index
const index = (req, res) => {
    Freelancer.findAll().then(posts => {
        res.render('site/home/index', {
            title: 'Home',
            freelancers: posts
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