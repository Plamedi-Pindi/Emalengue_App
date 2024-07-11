/**IMPORTS CONGING ============================================*/

const Curso = require('../../models/Curso');
const Modulo = require('../../models/Modulo');
const User = require("../../models/User");
const Aluno = require('../../models/Aluno');
const Telefone = require('../../models/Telefone');
const Inscricao = require('../../models/Inscricao');
const country = require('country-state-city').Country;


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
    const authUser = req.user;
    const item = req.params.id;
    await Curso.findOne({
        where:{ id: item},

        include:[
            {model: Aluno, as: 'alunos'}
        ]
    }).then( async post => {

        const aluno = await Aluno.findOne({ 
            where: {user_id: authUser.id},
            include: [
                { 
                    model: User,
                    include: [
                        {model: Telefone}
                    ]
                }
             ] 
        });
        
        let isEnrolled = false;
        const enrol = await Inscricao.findOne({ 
            where: {aluno_id: aluno.id},
            where: {curso_id: item},
        });
        if(enrol || authUser.role == 'admin') {
            isEnrolled = true;
        }

        const enrolled = post.alunos.length;    
        res.render('site/course/details/details', {
            title: 'eMaLENGUE | Detalhes do Curso',
            curso: post,
            enrolled: enrolled,
            countries: country.getAllCountries(),
            aluno: aluno,
            isEnrolled: isEnrolled,
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
            enrolled: enrolled,
        });
    });
}

/**EXPORTS CONFIG ============================================== */
module.exports ={
    index,
    detail,
    playlistShow,
}