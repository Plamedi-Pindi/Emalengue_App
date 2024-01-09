/**IMPORTS CONFIG ===========================================================*/

// Models inports
const Freelancer = require('../../models/Freelancer')

//Multer config
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, 'public/admin/img/freelancers')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })


/**METHODS CONFIG ========================================================== */

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
    //Freelancer Model
    Freelancer.create({
        name: req.body.name,
        email: req.body.email,
        senha: req.body.password,
        pais: req.body.country,
        provincia: req.body.province,
        habilidades: req.body.skills,
        certificacoes: req.body.certification,
        sobre: req.body.about,
        // bi: req.body.identification
        // cv: req.body.cv
    }).then(() => {
        res.send('Freelancer cadastrado com sucesso!');
    }).catch((err) => {
        console.log(`Erro ao cadastrar freelancer: ${err}`);
    })

    console.log(req.body, req.file);

}

/**EXPORT ================================================================= */
module.exports = {
    index,
    store, 
    create,
    upload
}