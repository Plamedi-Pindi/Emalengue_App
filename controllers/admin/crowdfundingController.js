//Import Config
const User = require('../../models/User');
const Crowdfunding = require('../../models/Crowdfundig')
const { checkUsser } = require('../../middleware/authMiddleware');
const Transacao = require('../../models/Transacao');
const { raw } = require('body-parser');
const multer = require('multer')
const fs = require('fs').promises;


// INDEX ====================================================
const index = async (req, res) => {
    await Crowdfunding.findAll({
        include: [
            { model: User },
        ]
    }).then(post => {

        res.render('admin/crowdfunding/home/index', {
            layout: 'main2',
            title: 'eMaLENGUE | Crowdfunding',
            crowdfundig: post,
        });

    })
}

// DETAILS ====================================================
const details = async (req, res) => {
    const crfId = req.params.id;

    await Crowdfunding.findOne({
        where: { id: crfId },
        include: [
            { model: User },
            { model: Transacao }
        ]
    }).then(async post => {
        const transacoes = await Transacao.findAll({
            where: { crowd_id: post.id },
            include: [
                { model: User }
            ],
            raw:true,
            nest:true
        });
        const apoios = transacoes.length;
        // console.log(transacoes.user);

        res.render('admin/crowdfunding/ditails/ditails', {
            layout: 'main2',
            title: 'eMaLENGUE |Detalhes do Crowdfunding',
            crowdfundig: post,
            apoios: apoios,
            transacoes: transacoes,
        });

    })
}



// CREATE ====================================================
const createView = (req, res) => {
    res.render('admin/crowdfunding/create/crowdfunding', {
        layout: 'main2',
        title: 'eMaLENGUE | Publicar Crowdfunding'
    });

}

//Multer config =======================================
/** 
 * This configuration allow the sistem to upload file from
 *  front-end to back-end using Multer depedence 
 * 
 * **/ 

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/admin/img/crowdfunding')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })
const imageUpload = upload.single('img')

/** METHODE TO CREATE A NEW CROWDFUNDING =========================================*/
const create = async (req, res) => {
    //Getting data from fornt-end
    const title = req.body.title;
    const link = req.body.link;
    const place = req.body.place;
    const valor = req.body.valor;
    const date = req.body.date;
    const dateNow = req.body.dateNow;
    const descrition = req.body.descrition;
    const authUser = req.params.id;
    const img = req.file.filename;

    // Prevoius data
    const correntDate = new Date();
    const dia = correntDate.getDate();
    const mes = correntDate.getMonth();
    const ano = correntDate.getFullYear();
    const hora = correntDate.getHours();
    const min = correntDate.getMinutes();
    const sec = correntDate.getSeconds();

    try {
        await Crowdfunding.create({
            titulo: title,
            link: link,
            local: place,
            valor_meta: valor,
            duracao: date,
            descricao: descrition,
            data: dateNow,
            hora: `${hora}:${min}:${sec}`,
            user_id: authUser,
            img: img

        }).then(post => {
            res.status(200).json(post)
        })
    } catch (err) {
        console.error(err);
    }
} // Create Method End

/** DELETE METHOD ======================================================================= */

// Functio to delete file where it is strored
async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath)
        console.log('File deleted successly!');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found or wrong path entered');
        } else {
            console.log('Error occored: ' + error.message);
        }
    }
}
//Delete Methods
const deleteCrowfunding = async (req, res)=> {
    // Getting the id of selected crowdfuding from client
    const item = req.params.id;
    const cf = await Crowdfunding.findOne({ where: {id: item}})


    //deleting the crowdfunding associeted file from the folder where it is stored 
    let path = 'public/admin/img/crowdfunding' // File path
    deleteFile(`${path}/${cf.img}`) // Delete file

    // Now this line going to remove the seleted crowdfunding
    await Crowdfunding.destroy({ where: {id: item}}).then(
        res.redirect('/dashboard/crowdfunding')
    )
}





module.exports = {
    index,
    create,
    createView,
    details,
    imageUpload,
    deleteCrowfunding
}