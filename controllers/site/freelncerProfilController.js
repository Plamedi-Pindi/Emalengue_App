/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer')
const Habilidade = require('../../models/Habilidade')
const User = require('../../models/User')
//index 
const index = (req, res) => {
    const id = req.params.id
    Freelancer.findOne({
        row: true,
        where: { id: id },
        include: [
            {
                model: User
            },
            {
                model: Habilidade,
                as: 'habilidades'
            }
        ]
    }).then(posts => {
        
        const freelancer = posts.toJSON()
        res.render('site/freeProfile/freelancer-profile', {
            title: 'eMaLENGUE | Perfil do Freelancer',
            freelancer: freelancer
        })
    })

}

/**EXPORT ===================================================== */
module.exports = {
    index
}