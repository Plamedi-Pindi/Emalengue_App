/**IMPORTS CONFIG ===========================================================*/
// Models inports
const Freelancer = require('../../models/Freelancer')


//Index
const index = (reqe, res) => {
    res.render('admin/freelancer/index', {
        layout: 'main2',
        title: 'Freelancers'
    })
}

//Create
const create = (req, res) => {
    res.render('admin/freelancer/create/create', {
        layout: 'main2',
        title: 'Cadastrar Freelancer'
    })
}

//Store
const store = (req, res) => {
    Freelancer.create({
        name: req.body.name,
        email: req.body.email,
        senha: req.body.password,
        pais: req.body.country,
        provincia: req.body.province,
        habilidades: req.body.skills,
        certicacoes: req.body.certification,
        // sobre: req.body.aboute,
        // bi: req.body.identification
    }).then(() => {
        console.log('Freelancer Cadastrado!');
    }).catch((err) => {
        console.log(`Erro ao cadastrar freelancer: ${err}`);
    })
}

/**EXPORT ================================================================= */
module.exports = {
    index,
    store, 
    create
}