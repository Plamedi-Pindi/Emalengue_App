/**IMPORTS CONFIG ===========================================================*/

const Freelancer = require('../../models/Freelancer')
const User = require('../../models/User')
const multer = require('multer')
const bcrypt = require('bcrypt')
const { name } = require('body-parser')
const Habilidade = require('../../models/Habilidade')
const Freelancerhabilidade = require('../../models/freelancerhabilidades')
// const freelancer = require('../../routes/admin/freelancerRoute')






/**METHODS CONFIG ========================================================== */

//Index
const index = async (req, res) => {
    Freelancer.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Habilidade,
                as: 'habilidades',
            }
        ]
    }).then( async (posts) => {
        const freelancer = posts
        console.log(freelancer);
        res.render('admin/freelancer/index', {
            freelancers: posts,
            layout: 'main2',
            title: 'eMaLENGUE | Freelancers',
        })

    })

}

//Create
const create = (req, res) => {
    Habilidade.findAll().then(result => {

        res.render('admin/freelancer/create/create', {
            layout: 'main2',
            title: 'Cadastrar Freelancer',
            habilidades: result,
        })
    })
}

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

//Store
const store = async (req, res) => {

    const password = req.body.password
    const img = req.files['img'][0].filename
    const cv = req.files['cv'][0].filename
    const bi = req.files['identification'][0].filename
    const encryptdePw = await bcrypt.hash(password, 10) //Hashing password
    const email = req.body.email
    const checkbox = req.body.fr_checkbox

    //Verify if there is alread a user with the email entered
    const user = await User.findOne({ row: true, where: { email: email } })


    if (user && checkbox != "on") {
        const userId = user.id
        const freelancer = await Freelancer.findOne({ row: true, where: { user_id: userId } })

        // Verify if there is a freelancer registered with this email
        if (freelancer) {
            const message = {
                code: 1,
                desc: "Já há um freelancer cadastrado com este email. Por favor, tente com um outro email! "
            }
            res.status(401).json(message)
        } else {
            const message = {
                code: 1,
                desc: "Já há um usuário cadastrado com este email. Se pretende associar este cadastro ao usuário Existente clique em 'Já sou um usário' ! "
            }
            res.status(401).json(message)
        }

    } else if (user && checkbox == "on") {
        const userId = user.id
        const freelancer = await Freelancer.findOne({ where: { user_id: userId } })
        if (freelancer) {
            const message = {
                code: 1,
                desc: "Já há um freelancer cadastrado com este email. Por favor, tente com um outro email! "
            }
            res.status(401).json(message)
        }
        else {

            const userId = user.id

            // Registra como freelancer
            await Freelancer.create({
                pais: req.body.country,
                provincia: req.body.province,
                certificacoes: req.body.certification,
                sobre: req.body.about,
                imagem: img,
                bi: bi,
                cv: cv,
                user_id: user.id,
                especialidade: req.body.especialidade,
                phone: req.body.phone

            }).then(async () => {
                // res.redirect('/dashboard/freelancer')
                const fr = await Freelancer.findOne({ row: true, where: { user_id: userId } })

                const habilidade = req.body.skills
                habilidade.forEach(async element => {
                    await Freelancerhabilidade.create({
                        habilidadeId: element,
                        freelancerId: fr.id,
                    })
                });

                res.status(200).json({ fr })
            }).catch((err) => {
                console.log(`Erro ao cadastrar freelancer: ${err}`);
            })
        }
    } else if (!user && checkbox == "on") {
        const message = {
            code: 1,
            desc: "Não há usuário com este email, desmarque a opção 'Já sou um usuário' !"
        }
        res.status(401).json(message)
    }
    else {

        //Registra primeiramente com usuario
        await User.create({
            nome: req.body.name,
            email: email,
            password: encryptdePw,
            role: 'freelancer'
        }).then(async () => {
            const user = await User.findOne({ row: true, where: { email } })
            const userId = user.id
            // Registra como freelancer
            await Freelancer.create({
                pais: req.body.country,
                provincia: req.body.province,
                certificacoes: req.body.certification,
                sobre: req.body.about,
                imagem: img,
                bi: bi,
                cv: cv,
                user_id: user.id,
                especialidade: req.body.especialidade,
                phone: req.body.phone

            }).then(async () => {
                // res.redirect('/dashboard/freelancer')
                const fr = await Freelancer.findOne({ row: true, where: { user_id: userId } })

                const habilidade = req.body.skills
                habilidade.forEach(async element => {
                    await Freelancerhabilidade.create({
                        habilidadeId: element,
                        freelancerId: fr.id,
                    })
                });

                res.status(200).json({ fr })
            }).catch((err) => {
                console.log(`Erro ao cadastrar freelancer: ${err}`);
            })

        }).catch((err) => {
            console.log("Erro ao cadastrar o usuario: " + err);
        })

    } //End Main If
}

//Destroy
const destroy = (req, res) => {
    Freelancer.destroy({ where: { 'id': req.params.id } }).then(() => {
        res.redirect('/dashboard/freelancer')
    }).catch((err) => {
        console.log('erro: ' + err);
    })
}

//Download
const downloadBI = (req, res) => {
    const id = req.params.id
    Freelancer.findOne({ row: true, where: { id: id } }).then(posts => {
        const file = posts.bi
        res.download(`public/admin/img/freelancers/${file}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
        // res.send('Ola esta funcionando') 
    })
}
//Download
const downloadCV = (req, res) => {
    const id = req.params.id
    Freelancer.findOne({ row: true, where: { id: id } }).then(posts => {
        const file = posts.cv
        res.download(`public/admin/img/freelancers/${file}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
        // res.send('Ola esta funcionando') 
    })
}

/**EXPORT ================================================================= */
module.exports = {
    index,
    store,
    create,
    coletionUpload,
    destroy,
    downloadBI,
    downloadCV,
}