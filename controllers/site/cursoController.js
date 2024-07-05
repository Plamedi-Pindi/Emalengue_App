/**IMPORTS CONGING ============================================*/

const Curso = require('../../models/Curso');
const Modulo = require('../../models/Modulo');
const User = require("../../models/User");
const Aluno = require('../../models/Aluno');


// INDEX ===================================================================
const index = async (req, res) => {
    await Curso.findAll({
        include: [
            {model: User}
        ],

    }).then( post => {
        console.log(post);
        res.render('site/course/index', {
            title: 'eMaLENGUE | Cursos',
            cursos: post,
        });
    });
}


// COURSE DETAILS =========================================================
const detail = async (req, res) => {
    const item = req.params.id;
    await Curso.findOne({
        where:{ id: item},

        include:[
            {model: Aluno, as: 'alunos'}
        ]
    }).then( post => {

        const enrolled = post.alunos.length;    
        console.log(enrolled);
        res.render('site/course/details/details', {
            title: 'eMaLENGUE | Detalhes do Curso',
            curso: post,
            enrolled: enrolled
        });
    });
}

const playlistShow = async (req, res) => {
    const item = req.params.id;
    await Curso.findOne({
        where: { id: item },

        include:[
            {model: Aluno, as: 'alunos'}
        ]
    }).then( post => {

        const enrolled = post.alunos.length;    

        res.render('site/course/details/courseShow', {
            title: 'eMaLENGUE | Acompanhar Curso',
            curso: post,
            enrolled: enrolled
        });
    });
}

/**EXPORTS CONFIG ============================================== */
module.exports ={
    index,
    detail,
    playlistShow,
}