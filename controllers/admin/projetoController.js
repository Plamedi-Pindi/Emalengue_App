/**IMPORTS CONFIG ===========================================================*/
const Projeto = require('../../models/Projeto')
const { checkUsser } = require('../../middleware/authMiddleware')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const multer = require('multer')
const nodemailer = require('nodemailer')
const Freelancerprojeto = require('../../models/Freelancerprojeto')
const Freelancer = require('../../models/Freelancer')
const freelancer = require('../../routes/site/freelancerRoute')
const Habilidade = require('../../models/Habilidade')
const Categoria = require('../../models/Categoria')
const ProjetoHabilidade = require('../../models/ProjetoHabilidade')




//Index =====================================================

const index = async (req, res) => {

    // Get logged user
    const correntUser = req.user


    // Check if the user is Admin
    if (correntUser.role === 'admin') {
        await Projeto.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Freelancer
                }

            ],

            order: [
                ['id', 'DESC']
            ]
        }).then((posts) => {

            res.render('admin/projetos/index', {
                title: 'eMaLENGUE | Projetos',
                layout: 'main2',
                projetos: posts,

            })
        })

    }

    // Check if the user is Freelancer
    else if (correntUser.role === 'freelancer' || correntUser.role === 'user') {
        await Projeto.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Freelancer,
                },
                {
                    model: Habilidade,
                    as: 'habilidades'
                },
                {
                    model: Categoria
                }
            ],
            // raw: true,
            // nest: true,
            order: [
                ['id', 'DESC']
            ]
        }).then((posts) => {

            res.render('admin/projetos/index2', {
                title: 'eMaLENGUE | Projetos',
                layout: 'main2',
                projetos: posts,

            })
        })
    }

    else {
        res.render('/dashboard')
    }
}

  


// Details ===================================================

const details = async (req, res) => {
    // Finde the selected project by it ID
    await Projeto.findOne({
        where: { id: req.params.id },
        include: [
            { model: User },
            { model: Freelancer },
            {
                model: Habilidade,
                as: 'habilidades'
            },
            { model: Categoria }
        ],
    
    }).then(async (result) => {

        const projeto = result.toJSON()
        const freelancer = projeto.freelancers
        const authUser = req.user

        // Teste if there is freelancer subscribed into this project or not
        if (freelancer.length != 0) {

            const correntFree = await Freelancer.findOne({
                where: { user_id: authUser.id },
                include: [
                    { model: User },
                    {
                        model: Projeto,
                        where: { id: projeto.id }
                    }
                ],

            })

            const allFreelancer = await Freelancer.findAll({
                include: [
                    { model: User },
                    {
                        model: Projeto,
                        where: { id: projeto.id}
                    },
                    { 
                        model: Habilidade,
                        as: 'habilidades'
                    }
                ],
                // raw: true,
                nest: true
            })
            
            console.log(allFreelancer)
            // Check if the corrent user is subscribed into this project or not
            if (correntFree){
                res.render('admin/projetos/details/detail', {
                    title: 'eMaLENGUE | Detalhe do Projetos',
                    layout: 'main2',
                    projeto: projeto,
                    freeNumber: freelancer.length,
                    subscribedUser: correntFree.toJSON(),
                    subFreelancer: allFreelancer,
                })
            } else {
                res.render('admin/projetos/details/detail', {
                    title: 'eMaLENGUE | Detalhe do Projetos',
                    layout: 'main2',
                    projeto: projeto,
                    freeNumber: freelancer.length,
                    subscribedUser: null,
                    subFreelancer: allFreelancer,
                })
            }
           
        } else {

            // console.log(habilidade);
            res.render('admin/projetos/details/detail', {
                title: 'eMaLENGUE | Detalhe do Projetos',
                layout: 'main2',
                projeto: projeto,
                freeNumber: freelancer.length,
                
            })

        }
    })
}

 



// My Projects ==============================================

const myProjects = async (req, res) => {
    const correntUser = req.user
    await Projeto.findAll({
        where: {
            user_id: correntUser.id
        },
        include: [
            {
                model: User,
            },
            {
                model: Freelancer
            }

        ],
        order: [
            ['id', 'DESC']
        ]
    }).then((posts) => {

        res.render('admin/projetos/index', {
            title: 'eMaLENGUE | Meus Projetos',
            layout: 'main2',
            projetos: posts,
            correntUser: correntUser,
        })
    })
}






//Search =====================================================

const search = (req, res) => {
    const query = req.query.q

    var sql = ''

    if (sql != '') {
        sql = ` SELECT * FROM projetos WHERE name LIKE '%${query}%' `
    } else {
        sql = ` SELECT * FROM projetos ORDER BY id `
        Pool.query(sql, (error, results) => {
            if (error) throw error

            res.send(results)
        })
    }
}




// NODEMAILER CONFIG =========================================

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'williamspaindi72@gmail.com',
        pass: 'nktb pifo jspz dswg'
    }
})
async function sendMial(emailOption) {
    await transporter.sendMail(emailOption, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}



//Create ============================================

const create = async (req, res) => {
    await Habilidade.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(async (result) => {

        await Categoria.findAll({
            order: [
                ['id', 'DESC']
            ]
        }).then(result1 => {

            res.render('admin/projetos/create/create', {
                layout: 'main2',
                title: 'Publicar Projeto',
                habilidade: result,
                categoria: result1,
            })
        })
    })

}

//Multer config =======================================

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/admin/img/projetos')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })
const imageUpload = upload.single('pj_img')

//Store '==============================================

const store = ((req, res) => {

    // Get token from the cookies
    const token = req.cookies.jwt;

    // Verify the token 
    jwt.verify(token, 'emalengue app', async (err, decodedToken) => {
        // Fire a message if the token was not verified
        if (err) {
            console.log(err.message);
            res.locals.user = null
        } else {
            //Find logged user through te gotten token
            const user = await User.findByPk(decodedToken.id)

            const name = req.body.nome;
            const categoria = req.body.categoria;
            const about = req.body.descricao;
            const date = req.body.prazo;
            const img = req.file.filename;
            const habilidade = req.body.habilidades;

            console.log(req.body.habilidades.length)

            await Projeto.create({
                nome: name,
                categoria_Id: categoria,
                descricao: about,
                prazo: date,
                user_id: user.id,
                image: img

            }).then(async (project) => {

                habilidade.forEach(async element => {
                    await ProjetoHabilidade.create({
                        habilidadeId: element,
                        projetId: project.id
                    })
                });

                //Sending mail ========================
                const mailOption = {
                    from: 'williamspaindi72@gmail.com',
                    to: 'plamedipindi77@gmail.com',
                    subject: 'Um novo projeto foi publicado',
                    text: 'Esta tudo calmo!',
                    html: `<h1> ${name} </h1>
                           <h4> Categoria: ${categoria} </h4>
                           <h4> Prazo: ${date} </h4>
                           <h4> Publicado por: ${user.nome} </h4>
                           <h4> Sobre o projeto: </h4>
                           <p>${about}</p>
                           <img src="public/admin/img/projetos/1707842892001-ERP.png" >

                    `
                }
                sendMial(mailOption)

                res.status(200).json({ project })
            }).catch((err) => {
                console.log('Erro ao criar Projeto!' + err);
            })

        }
    })

})



// UPDATE ========================================================================

const update = async (req, res) => {

    const projectId = req.params.id
    await Projeto.findOne({
        where: { id: projectId }
    }).then(results => {

        res.render('admin/projetos/update/update', {
            layout: 'main2',
            title: 'eMaLENGUE | Editar projeto',
            projeto: results,
        })
    })
}

const updateProject = (req, res) => {
    res.json({ teste: 'Ola meu perseverante amigo programador de sucesso' })

    // Get token from the cookies
    const token = req.cookies.jwt;
    jwt.verify(token, 'emalengue app', async (err, decodedToken) => {

        // Fire a message if the token was not verified
        if (err) {
            console.log(err.message);
            res.locals.user = null
        } else {
            //Find logged user through te gotten token
            const user = await User.findByPk(decodedToken.id)

            console.log(req.body);

            // const name = req.body.nome;
            // const categoria = req.body.categoria;
            // const about = req.body.descricao;
            // const date = req.body.prazo;

            // const updates = {
            //     name,
            //     categoria,
            //     about,
            //     date,
            // }
            // if (req.file) {
            //     const image = req.file.filename;
            //     updates.image = image;
            // }

            // const condition = { where: { id: req.params.id } }
            // const value = {
            //     nome: updates.name,
            //     categoria: updates.categoria,
            //     descricao: updates.about,
            //     // habilidade: updates.req.body.habilidades,
            //     prazo: updates.date,
            //     // user_id: correntUser.id,
            //     image: updates.img
            // }

            // await Projeto.update(value, condition).then(async (project) => {

            //     res.status(200).json(req.body)
            // }).catch((err) => {
            //     console.log('Erro ao criar Projeto!' + err);
            // })


        }
    })
}



// ========================================================================
/** 
 * This methos is responsible for allowing somoane to apply for a published project
 * In this single case, it going to allow only a freelancer to applay for a project  
*/

const applayToProject = async (req, res) => {
    const authUser = req.user
    const projectId = req.params.id

    // Check if it is a freelancer
    if (authUser.role === 'freelancer') {
        const pr = await Projeto.findOne({
            where: { id: projectId },
            include: [
                {
                    model: Freelancer
                }
            ],
            raw: true,
            nest: true,
        })

        // Check if this freelancer is alread subscribed
        const existentFree = pr.freelancers.Freelancerprojetos.freelancId
        const freelancer = await Freelancer.findOne({ where: { user_id: authUser.id } })

        if (existentFree == freelancer.id) {
            console.log('Ja estas inscrito!');
            res.status(400).redirect('back')
        } else {
            // Subscribe a freelancer to a project
            await Freelancerprojeto.create({
                projetId: projectId,
                freelancId: freelancer.id,
            })
            console.log('inscrito!');
            res.status(200).redirect('back')
        }
    } else {
        res.redirect('/dashboard/projeto/detalhes/projectId')
    }



}



/**EXPORT ================================================================= */
module.exports = {
    create,
    store,
    imageUpload,
    index,
    search,
    details,
    myProjects,
    applayToProject,
    update,
    updateProject,
}