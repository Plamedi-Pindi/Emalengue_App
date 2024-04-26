/**IMPORTS CONFIG ===========================================================*/
const Freelancer = require('../../models/Freelancer')
const Projects = require('../../models/Projeto')

//Index
const index = async (req, res) => {
    const id = req.user.id

    try {
        
        const freelancer = await Freelancer.findAll();
        const projeto = await Projects.findAll();

        res.render('admin/home/index', {
            layout: 'main2',
            title: 'eMaLENGUE | Painel de Controlo',
            freelancerNum: freelancer.length,
            projetoNum: projeto.length,

        })

    } catch (error) {
        console.error(error.message)
    }
}



/**EXPORT ================================================================= */
module.exports = {
    index
} 