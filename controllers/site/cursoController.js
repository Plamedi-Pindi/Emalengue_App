/**IMPORTS CONGING ============================================*/

const Curso = require('../../models/Curso');
const Modulo = require('../../models/Modulo');
const User = require("../../models/User");
const Aluno = require('../../models/Aluno');
const Telefone = require('../../models/Telefone');
const Inscricao = require('../../models/Inscricao');
const country = require('country-state-city').Country;
const { Sequelize } = require("../../models/db");
const Category = require('../../models/Categoria');


// INDEX ===================================================================
const index = async (req, res) => {
    const pageSize = 8;
    const page = req.query.page  || 1;
    console.log(page);

    await Curso.findAll({
        // include: [
        //     { model: User }
        // ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
    }).then(async post => {
        
        const cursos = await Curso.findAll(); 
        const count = cursos.length;

        const totalPages = Math.ceil(count / pageSize);
        const showPrevious = page > 1;
        const showNext = page < totalPages;

        const interval = [];
        for (let i = 0; i < totalPages; i++) {
           interval.push(i+1);
        }

        let proxima = parseInt(page) + 1;
        let anterior = parseInt(page) - 1;

        let user = []
        for (const item of post) {
            user = await item.getUser({
            //   limit: 6, // Limitar a 3 habilidades por freelancer
            //   order: [['name', 'ASC']] // Ordenar por nome da habilidade
            });
        }

        // Get all category 
        const category = await Category.findAll();
        console.log(category);

        res.render('site/course/index', {
            title: 'eMaLENGUE | Cursos',
            cursos: post,
            anterior,
            proxima,
            showPrevious,
            showNext,
            correntPage: page,
            totalPages:totalPages,
            interval: interval,
            User: user,
            Categories: category,
        });
    });
}

const categorySearch = async (req, res)=>{
    const  item = req.params.id;

    const pageSize = 8;
    const page = req.query.page  || 1;
    console.log(page);

    await Curso.findAll({
        where: {
            categoria_id: item
        },
        limit: pageSize,
        offset: (page - 1) * pageSize,
    }).then(async post => {
        
        const cursos = await Curso.findAll({ where: {id:item }}); 
        const count = cursos.length;

        const totalPages = Math.ceil(count / pageSize);
        const showPrevious = page > 1;
        const showNext = page < totalPages;

        const interval = [];
        for (let i = 0; i < totalPages; i++) {
           interval.push(i+1);
        }

        let proxima = parseInt(page) + 1;
        let anterior = parseInt(page) - 1;

        let user = []
        for (const item of post) {
            user = await item.getUser({
            //   limit: 6, // Limitar a 3 habilidades por freelancer
            //   order: [['name', 'ASC']] // Ordenar por nome da habilidade
            });
        }

        // Get all category 
        const category = await Category.findAll();
        console.log(category);

        res.render('site/course/search/caterorySearch', {
            title: 'eMaLENGUE | Cursos',
            cursos: post,
            anterior,
            proxima,
            showPrevious,
            showNext,
            correntPage: page,
            totalPages:totalPages,
            interval: interval,
            User: user,
            Categories: category,
        });
    });
    
}

// COURSE DETAILS =========================================================
const detail = async (req, res) => {
    const authUser = req.user;
    const item = req.params.id;
    await Curso.findOne({
        where: { id: item },

        include: [
            { model: Aluno, as: 'alunos' }
        ]
    }).then(async post => {
        let aluno = false;
        let isEnrolled = false;
        let enrol = false;

        // Check if the user is logged and perform the task
        if (authUser) {

            aluno = await Aluno.findOne({

                where: { user_id: authUser.id },
                include: [
                    {
                        model: User,
                        include: [
                            { model: Telefone }
                        ]
                    }
                ]
            });

            // Check if the logged user is enrolled and perform the task
            if (aluno) {

                enrol = await Inscricao.findOne({
                    where: { aluno_id: aluno.id },
                    where: { curso_id: item },
                });

                if (enrol || authUser.role == 'admin') {
                    isEnrolled = true;
                }
            }


        } // END MAIN IF 


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

        include: [
            { model: Aluno, as: 'alunos' }
        ]
    }).then(post => {

        const enrolled = post.alunos.length;


        res.render('site/course/details/courseShow', {
            title: 'eMaLENGUE | Acompanhar Curso',
            curso: post,
            enrolled: enrolled,
        });
    });
}

const search = async (req, res) => {
    const { query } = req.query;
    let cursos = [];
    cursos = await Curso.findAll({
        where: {
            name: {
                [Sequelize.Op.like]: `%${query}%`
            }
        },
        include: [{ model: User }]
    });
    console.log(cursos);
    res.json(cursos);

}

/**EXPORTS CONFIG ============================================== */
module.exports = {
    index,
    detail,
    playlistShow,
    search,
    categorySearch,
}