/** Import config ======================================================*/

const Curso = require("../../models/Curso");
const multer = require('multer');
const body = require('body-parser');
const Categoria = require('../../models/Categoria');
const Modulo = require('../../models/Modulo');


// Idenx ===============================================================
const index = (req, res) => {
    res.render('admin/cursos/index', {
        title: 'eMaLENGUE | Cursos',
        layout: 'main2',
    })
}


// NEW COURSE PUBLISHING ================================================
const addCourseView = async (req, res) => {

    await Categoria.findAll().then(post => {
        res.render('admin/cursos/create/create', {
            title: 'eMaLENGUE | Novo Curso',
            layout: 'main2',
            categoria: post,
        });

    })
}


// COURSE DETAILS =======================================================
const courseDetails = (req, res) => {
    res.render('admin/cursos/details/details', {
        title: 'eMaLENGUE | Detalhes do curso',
        layout: 'main2',
    });
}


const courseWhatch = (req, res) => {
    res.render('admin/cursos/details/show', {
        title: 'eMaLENGUE | Curso',
        layout: 'main2',
    });
}

const alunos = (req, res) => {
    res.render('admin/cursos/details/subscription', {
        title: 'eMaLENGUE | Alunos',
        layout: 'main2',
    });
}


/** PUBLICAR CURSO  ======================== */
// MULTER
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "public/admin/img/cursos");
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
const imgUpload = upload.single('img');

//MAIN METHOD
const publicarCurso = async (req, res) => {
    //CURSO ATTBUITES
    const name = req.body.title;
    const descricao = req.body.description;
    const categoria_id = req.body.category;
    const user_id = req.params.id;
    const custo = req.body.coust;
    let nivel = '';
    const playlist = req.body.playlist;
    const data = req.body.date;
    const image = req.file.filename;

    if (req.body.nivel) {
        nivel = req.body.nivel;
    } else {
        nivel = 'sem Classificação';
    }

    const date = new Date();
    const hora = date.getTime();
 

    if (req.body.moduleName) {
        const moduleName = req.body.moduleName;
        const order = req.body.order

        await Curso.create({
            name: name,
            descricao: descricao,
            categoria_id: categoria_id,
            user_id: user_id,
            custo: custo,
            nivel: nivel,
            data: data,
            hora: hora,
            image: image,
        }).then( async result => {
            // Check if the module is or not an array
            if (Array.isArray(moduleName)) {

                for (let i = 0; i < moduleName.length; i++) {
                    
                    const courseModule = await Modulo.create({
                        nome: moduleName[i],
                        playlist: playlist[i],
                        cusro_mod_id: result.id,
                        ordem: order[i],
                    })
                }
                console.log('Dados enviados');
            } else {
                const courseModule = await Modulo.create({
                    nome: moduleName,
                    playlist: playlist,
                    cusro_mod_id: result.id,
                    ordem: order,
                })
                console.log(courseModule.toJSON())
            }
        }).catch(error => {
            console.error('Algo está errado ao criar os modulos: ' + error);
        });
    } else {

        // CREATING CURSO INSTANCE
        await Curso.create({
            name: name,
            descricao: descricao,
            categoria_id: categoria_id,
            user_id: user_id,
            custo: custo,
            nivel: nivel,
            playlist: playlist,
            data: data,
            hora: hora,
            image: image,
        }).then( result => {
            console.log(result.toJSON())
        }).catch( error => {
            console.error('Algo está errado: ' + error);
        });
    }

}

module.exports = {
    index,
    publicarCurso,
    addCourseView,
    courseDetails,
    courseWhatch,
    alunos,
    imgUpload,
}