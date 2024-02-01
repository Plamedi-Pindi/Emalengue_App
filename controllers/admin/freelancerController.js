/**IMPORTS CONFIG ===========================================================*/

const Freelancer = require('../../models/Freelancer')
const User = require('../../models/User')
const multer = require('multer')
const bcrypt = require('bcrypt')
const { name } = require('body-parser')
const freelancer = require('../../routes/admin/freelancerRoute')


//Multer config
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/admin/img/freelancers')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })
const coletionUpload = upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'identification', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
])



/**METHODS CONFIG ========================================================== */

//Index
const index = async (reqe, res) => {
    Freelancer.findAll().then((posts) => {
        res.render('admin/freelancer/index', {
            freelancers: posts,
            layout: 'main2',
            title: 'Freelancers',
        })

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
const store = async (req, res) => {

    const password = req.body.password
    const img = req.files[img][0].filename
    const cv = req.files['cv'][0].filename
    const bi = req.files['identification'][0].filename
    const encryptdePw = await bcrypt.hash(password, 10) //Hashing password
    const email = req.body.email
    
    //Registra primeiramente com usuario
    await User.create({
        nome: req.body.name,
        email: email, 
        password: encryptdePw,
        role: 'freelancer'
    }).then( async ()=> {
        const user = await User.findOne({ row: true, where: { email } })
        
        // Registra como freelancer
        const fr = Freelancer.create({
            pais: req.body.country,
            provincia: req.body.province,
            habilidades: req.body.skills,  
            certificacoes: req.body.certification,
            sobre: req.body.about,
            imagem: img,
            bi: bi,
            cv: cv,
            user_id: user.id

        }).then(() => {
            // res.redirect('/dashboard/freelancer')
            res.status(200).json(fr)
 
        }).catch((err) => {
            console.log(`Erro ao cadastrar freelancer: ${err}`);
        })

    }).catch((err) => {
        console.log("Erro ao cadastrar o usuario: " + err);
    })


}

//Destroy
const destroy = (req, res) => {
    Freelancer.destroy({where: {'id': req.params.id}}).then(() => {
        res.redirect('/dashboard/freelancer')
    }).catch((err) => {
        console.log('erro: ' + err);
    })
}

/**EXPORT ================================================================= */
module.exports = {
    index,
    store,
    create,
    coletionUpload,
    destroy
}