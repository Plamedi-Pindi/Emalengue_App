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
            {
                model: Habilidade, 
                as: 'habilidades',
            }
        ],

    }).then(posts => {

        res.render('site/home/index', {
            title: 'eMaLENGUE',
            freelancers: posts,
            cursos: cursos,
            
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