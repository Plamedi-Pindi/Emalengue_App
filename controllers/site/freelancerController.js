/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
//index
const index = (req, res) => {
    Freelancer.findAll().then(posts => {
        res.render('site/freelancer/index', {
            Freelancers: posts,
            title: 'Freelancers',
        })
    })
}



/**EXPORTS CONFIG ============================================== */
module.exports = {
    index
}