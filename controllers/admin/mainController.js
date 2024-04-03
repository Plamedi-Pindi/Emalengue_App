/**IMPORTS CONFIG ===========================================================*/
const Freelancer = require('../../models/Freelancer')


//Index
const index = async (req, res) => {
    const id = req.user.id

    try {
        await Freelancer.findOne({ where: {user_id: id}}).then(post => {
            res.render('admin/home/index', {
                layout: 'main2',
                title: 'eMaLENGUE | Painel de Controlo',
                freelancer: post,
            })
        })

    } catch (error) {
        console.error(error.message)
    }
}



/**EXPORT ================================================================= */
module.exports = {
    index
} 