// Import config ===================================================================
const { raw } = require('body-parser');
const Crowdfunding = require('../../models/Crowdfundig');
const Transacao = require('../../models/Transacao');
const User = require('../../models/User');
const multer = require('multer');




// INDEX ==============================================
const index = async (req, res) => {
    await Crowdfunding.findAll({
        include: [
            {
                model: User
            },
            {
                model: Transacao
            }, 
        ],
        // raw:  true,
        // nest: true,
    }).then(result => {

        const crwodfunding = result;
        const transacoes = crwodfunding.transacoes;
        let totalValue = 0;
        let purcent_value = 0;

      
        res.render('site/crowdfunder/index', {
            title: 'eMaLENGUE | Crowdfunding',
            crowdfunding: result
        });
    })
}

// DETAILS ===============================================
const details = async (req, res) => {
    const crowdId = req.params.id;
    await Crowdfunding.findOne({
        where: { id: crowdId },
        include: [
            {
                model: User
            },
            {
                model: Transacao
            },
        ]
    }).then(result => {

        // Declaring datas
        const crowdfunding = result;           
        const valueGoal = crowdfunding.valor_meta;
        const transacoes = crowdfunding.transacoes;
        let totalValue = 0;
        let vg_purcent = 0;

       // Method to assign to "totalValue" sum of all transation value
        transacoes.forEach(element => {
            totalValue += element.valor;
        });

        //Condition to calculete the purcent of the gotten "valor" 
        if (totalValue <= valueGoal) {
            vg_purcent = (totalValue * 100) / valueGoal;
        } else {
            vg_purcent = 100;
        }

        // Definig start date and end date
        const startDate = new Date(crowdfunding.data );
        const endtDate = new Date(crowdfunding.duracao );
        const toDay = new Date();

        // Calculete the difference in milleiseconds
        const differenceInMilliseconds = endtDate - startDate;
        const consumedTimeMilliseconds = toDay - startDate;

        // Convert millisencods per day
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const differnceInDay = Math.round(differenceInMilliseconds / millisecondsPerDay);
        const consumedTimeInDay = Math.round(consumedTimeMilliseconds / millisecondsPerDay);
        const restDay = differnceInDay - consumedTimeInDay;

        console.log(restDay);

        

        res.render('site/crowdfunder/details/details', {
            title: 'eMaLENGUE | Detalhes',
            crowdfunding: result,
            vg_purcent: vg_purcent,
            apoios: transacoes.length,
            restDay: restDay,
        })
    })
}

// Multer config ===================
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/site/pdfs/comprovativos');
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })
const fileUpload = upload.single('comprovativo');

// Delete file ======================

// async function deleteFile(filePath) {
//     try {
//         await fs.unlink(filePath)
//         console.log('File deleted successly!');
//     } catch (error) {
//         if (error.code === 'ENOENT') {
//             console.log('File not found or wrong path entered');
//         } else {
//             console.log('Error occored: ' + error.message);
//         }
//     }
// }


// CREATE APOIO ====================================================
const credateApoio = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const ibam = req.body.ibam;
    const value = req.body.value;
    const descrition = req.body.descrition;
    const comprovativo = req.file.filename;
    const crowdId = req.params.id;

    const date = new Date();
    const hora = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();


    try {
        // This first condition takes logged user
        const user = await User.findOne({ where: { email: email } })
        if (user) {

            await Transacao.create({
                valor: value,
                descricao: descrition,
                comprovativo: comprovativo,
                user_id: user.id,
                crowd_id: crowdId,
                hora: `${hora}:${min}:${sec}`,
                metodo_pagamento: 'Transferência',
                data: date,
            }).then(result => {
                res.status(200).json(result)
            })
        }

    } catch (err) {
        console.error(err);
    }

}

module.exports = {
    index,
    details,
    credateApoio,
    fileUpload,
}