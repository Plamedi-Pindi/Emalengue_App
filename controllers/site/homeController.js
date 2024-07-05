/**IMPORTS CONGING ============================================*/
const Freelancer = require('../../models/Freelancer');
const User = require('../../models/User');
const Habilidade = require('../../models/Habilidade');
const Curso = require('../../models/Curso');

//Index
const index = async (req, res) => {

    const cursos = await Curso.findAll({
        include: [
            { model: User }
        ],
    });

    const user = req.user
    await Freelancer.findAll({
        include: [
            {
                model: User,
            },
            // {
            //     model: Habilidade, 
            //     as: 'habilidades',
                
            // }
        ],

    }).then( async posts => {

        let habilidade = []
        for (const freelancer of posts) {
            habilidade = await freelancer.getHabilidades({
              limit: 6, // Limitar a 3 habilidades por freelancer
              order: [['name', 'ASC']] // Ordenar por nome da habilidade
            });
        }

        res.render('site/home/index', {
            title: 'eMaLENGUE',
            freelancers: posts,
            cursos: cursos,
            habilidades: habilidade
        });
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