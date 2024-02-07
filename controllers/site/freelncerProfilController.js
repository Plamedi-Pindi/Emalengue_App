/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
 const User = require('../../models/User')
//index 
const index = (req, res) => {
    const id = req.params.id
    Freelancer.findOne({
        row: true,
        where: { id: id },
        include: [{
            model: User
        }]
    }).then( posts => {
        res.render('site/freeProfile/freelancer-profile', {
            title: 'Perfil do Freelancer',
            freelancer: posts
        })
    })

}

/**EXPORT ===================================================== */
module.exports = {
    index
}