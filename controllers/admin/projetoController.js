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




//Index =====================================================

const index = async (req, res) => {

    // Get logged user
    const correntUser = req.authUser

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
    await Projeto.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: User,
            },
            {
                model: Freelancer
            }
        ],
        raw: true,
        nest: true, 
    }).then(result => {
        console.log(result);
        res.render('admin/projetos/details/detail', {
            title: 'eMaLENGUE | Detalhe do Projetos',
            layout: 'main2',
            projeto: result,

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

const create = (reqe, res) => {

    res.render('admin/projetos/create/create', {
        layout: 'main2',
        title: 'Publicar Projeto'
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

            await Projeto.create({
                nome: name,
                categoria: categoria,
                descricao: about,
                habilidade: req.body.habilidades,
                prazo: date,
                user_id: user.id,
                image: img

            }).then(async (project) => {

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

// ========================================================================
/** 
 * This methos is responsible for allowing somoane to apply for a published project
 * In this single case, it going to allow only a freelancer to applay for a project  
*/

const applayToProject = async (req, res) => {
    const authUser = req.authUser
    const projectId = req.params.id

    // Check if it is a freelancer
    if (authUser.role === 'freelancer') {

        const fr = await Freelancer.findOne({
            where: { user_id: authUser.id },
            include: [
                {
                    model: Projeto

                }
            ],
            raw: true,
            nest: true,
        })
        // const frId = fr.projetos.Freelancerprojetos.freelancerId
        // const frUser = await 

        if (fr) {
            console.log('Ja estas inscrito!');
            res.status(400).redirect('back')
        } else {

            Freelancerprojeto.create({
                projetoId: projectId,
                freelancerId: fr.id,
            })
            console.log('inscrito!');
            res.status(200).redirect('back')
        }
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
    applayToProject,
}