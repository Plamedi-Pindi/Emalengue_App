/**IMPORTS CONFIG ===========================================================*/
const Projeto = require('../../models/Projeto')
const { checkUsser } = require('../../middleware/authMiddleware')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const multer = require('multer')
const nodemailer = require('nodemailer') 


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
    await transporter.sendMail(emailOption, (err, info)=>{
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

    const token = req.cookies.jwt;

    jwt.verify(token, 'emalengue app', async (err, decodedToken) => {

        if(err) { 
            console.log(err.message);
            res.locals.user = null
        } else {  
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
                image:  img

            }).then( async (project) => {

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

                res.status(200).json({project})
            }).catch((err) => { 
                console.log('Erro ao criar Projeto!' + err);
            })
            
        } 
    })
    

})



/**EXPORT ================================================================= */
module.exports = {
    create,
    store,
    imageUpload,
}