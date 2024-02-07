/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
const User = require('../../models/User')

//Index
const index = (req, res) => {
    Freelancer.findAll({
        include: [{
            model: User,
        }]
    }).then(posts => {
        res.render('site/home/index', {
            title: 'Home',
            freelancers: posts,

            helpers:{
                hello: ()=>{
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