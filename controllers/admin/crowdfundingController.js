//Import Config
const User = require('../../models/User');
const Crowdfunding = require('../../models/Crowdfundig')
const { checkUsser } = require('../../middleware/authMiddleware');
const Transacao = require('../../models/Transacao');
const { raw } = require('body-parser');
const multer = require('multer')
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');
const FS = require('fs');
const youtubeEmbed = require('youtube-embed');


// INDEX ====================================================
const index = async (req, res) => {
    await Crowdfunding.findAll({
        include: [
            { model: User },
            { model: Transacao }
        ],
        // raw: true,
        // nest: true 
    }).then(post => {
        const coun = 0;

        res.render('admin/crowdfunding/home/index', {
            layout: 'main2',
            title: 'eMaLENGUE | Crowdfunding',
            crowdfundig: post,
        });

    })
}

// DETAILS ====================================================
const details = async (req, res) => {
    // Get id of selected element
    const crfId = req.params.id;

    // Find the specific crowdfunding by it id and join it Transation
    await Crowdfunding.findOne({
        where: { id: crfId },
        include: [
            { model: User },
            { model: Transacao }
        ],

    }).then(async post => {

        // "transacoes" get all transation associeted and it users
        const transacoes = await Transacao.findAll({
            where: { crowd_id: post.id },
            include: [
                { model: User }
            ],
            raw: true,
            nest: true
        });

        // "apoios" Get the length of the transation
        const apoios = transacoes.length;

        let arrecadado = 0; // Will get the sum of all transation value
        // Method to perform the sum of value of each transation and asign the result into "arrecadado" variable
        transacoes.forEach(element => {
            arrecadado += element.valor
        });

        // render the page
        res.render('admin/crowdfunding/ditails/ditails', {
            layout: 'main2',
            title: 'eMaLENGUE |Detalhes do Crowdfunding',
            crowdfundig: post,
            apoios: apoios,
            transacoes: transacoes,
            arrecadado: arrecadado
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
const imageUpload = upload.single('img');

// EMBAD FUNCTION ****************************
function getEmbedUrl(url) {
    const playlistRegex = /[?&]list=([^#\&\?]*)/;
    const videoRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^#\&\?]*)/;
    
    const playlistMatch = url.match(playlistRegex);
    const videoMatch = url.match(videoRegex);
  
    if (playlistMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`;
    } else if (videoMatch) {
      return `https://www.youtube.com/embed/${videoMatch[1]}`;
    } else {
      return null;
    }
  }


/** METHODE TO CREATE A NEW CROWDFUNDING =========================================*/
const create = async (req, res) => {
    //Getting data from fornt-end
    const title = req.body.title;
    const link = getEmbedUrl(req.body.link);
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
const deleteCrowfunding = async (req, res) => {
    // Getting the id of selected crowdfuding from client
    const item = req.params.id;
    const cf = await Crowdfunding.findOne({ where: { id: item } })


    //deleting the crowdfunding associeted file from the folder where it is stored 
    let path = 'public/admin/img/crowdfunding' // File path
    deleteFile(`${path}/${cf.img}`) // Delete file

    // Now this line going to remove the seleted crowdfunding
    await Crowdfunding.destroy({ where: { id: item } }).then(
        res.redirect('/dashboard/crowdfunding')
    )
}

/** UPDATE ============================================================== */
// update view
const updateView = async (req, res) => {
    //get selected crowdfunding id
    const item = req.params.id;

    //Finding the selected crowdfunding in the server
    await Crowdfunding.findOne({ where: { id: item } }).then(result => {
        res.render('admin/crowdfunding/update/update', {
            layout: 'main2',
            title: 'eMaLENGUE | Atualizar crowdfunding',
            crowdfunding: result,
        });
    })
}

//Multer config =======================================
/** 
 * This configuration allow the sistem to upload file from
 * front-end to back-end using Multer depedence.
 * Here will be used to update file
 * 
 **/

const storageUpdate = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/admin/img/crowdfunding')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }
});
const uploadUpdate = multer({ storage: storageUpdate })
const imageUpdata = uploadUpdate.single('img')

// Updata data
const updateData = async (req, res) => {
    const item = req.params.id;

    //Getting data from fornt-end
    const title = req.body.title;
    const link = req.body.link;
    const place = req.body.place;
    const valor = req.body.valor;
    const date = req.body.date;
    const dateNow = req.body.dateNow;
    const descrition = req.body.descrition;
    const authUser = req.params.id;

    await Crowdfunding.findOne({ where: { id: item } }).then(result => {
        const cf = result;
        /**
         * Check if there is a file to be update, if not, it update other data
        */
        if (req.file) {
            const img = req.file.filename;
            cf.update({
                titulo: title,
                link: link,
                local: place,
                valor_meta: valor,
                duracao: date,
                descricao: descrition,
                data: dateNow,
                img: img
            });
            // Rend the result to client as a json
            const alert = {
                message: 'A campanha foi atualizada com sucesso!'
            }
            res.status(200).json(alert)
        } else {
            const img = cf.img
            cf.update({
                titulo: title,
                link: link,
                local: place,
                valor_meta: valor,
                duracao: date,
                descricao: descrition,
                data: dateNow,
                img: img
            });
            // Rend the result to client as a json
            const alert = {
                message: 'A campanha foi atualizada com sucesso!'
            }
            res.status(200).json(alert)
        }
    })

}


// READ PDF METHOD ==========================================================
const readPDF = async (req, res) => {
    // const id = req.params.id;
    // const item = await Transacao.findOne({ where: { id:id } });
    // const comprovativo = item.comprovativo;
    // const pdfPath = `public/site/pdfs/comprovativos/${comprovativo}`;
    // const pdfBytes = FS.readFileSync(pdfPath);

    // const pdfDoc = await PDFDocument.load(pdfBytes);
    // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })

    // res.send("Ola esta tudo mais calmo agora" + `<a href="${pdfDataUri}" target="_blank" rel="noopener noreferrer">Clica aqui </a>`)   
} // readPDF End ============================================================



// ALTER TRANSATION STATUS METHOD ==========================================================
const transationStatus = async (req, res) => {
    const id = req.params.id;
    const aprovar = req.body.aprovar;
    const rejeitar = req.body.rejeitar;
    console.log(req.body);
} // transationStatus End ============================================================


module.exports = {
    index,
    create,
    createView,
    details,
    imageUpload,
    deleteCrowfunding,
    updateView,
    updateData,
    imageUpdata,
    readPDF,
    transationStatus,
}