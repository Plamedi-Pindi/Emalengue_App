/** Import config ======================================================*/

const Curso = require("../../models/Curso");
const multer = require('multer');
const body = require('body-parser');
const Categoria = require('../../models/Categoria');
const Modulo = require('../../models/Modulo');
const curso = require("../../routes/admin/cursoRoute");


// Idenx ===============================================================
const index = async (req, res) => {

    await Curso.findAll({
        order:[ 
            [ 'id', 'DESC'], 
        ]
    }).then(result => {

        res.render('admin/cursos/index', {
            title: 'eMaLENGUE | Cursos',
            layout: 'main2',
            cursos: result,
        })
    });
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
const courseDetails = async (req, res) => {

    const item = req.params.id;

    await Curso.findOne({ 
        where: { id: item },
        include: [
            { model: Modulo},
            { model: Categoria},
        ],
        // raw: true,
        // nest: true
    }).then( result => {
        
        const moduloLengtth = result.modulos.length;

        res.render('admin/cursos/details/details', {
            title: 'eMaLENGUE | Detalhes do curso',
            layout: 'main2',
            curso: result,
            moduloLength: moduloLengtth,
        });
    });
}


const courseWhatch = async (req, res) => {
    const item = req.params.id;

    await Curso.findOne({ 
        where: { id: item },
        include: [
            { model: Modulo},
            { model: Categoria},
        ],
    }).then( result => {

        const moduloLength = result.modulos.length;
        let major = false;
        let iqual = false;

        if (moduloLength == 0) {
            iqual = true;
        }
        if (moduloLength > 0) {
            major = true;
        }


        res.render('admin/cursos/details/show', {
            title: 'eMaLENGUE | Curso',
            layout: 'main2', 
            curso: result,
            major: major,
            iqual: iqual,

        });
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

    // Checks if the user enter "nivel" variable value
    if (req.body.nivel) {
        nivel = req.body.nivel;
    } else {
        // Asign the default value if the user didn't
        nivel = 'Sem classificação';
    }

    const date = new Date();
    const hora = date.getTime();
 
    // Check if the course to be buplished going to or not have modules
    if (req.body.moduleName) {
        const moduleName = req.body.moduleName;
        const order = req.body.order

        // publish a course
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
                    // Publish modules
                    const courseModule = await Modulo.create({
                        nome: moduleName[i],
                        playlist: playlist[i],
                        cusro_mod_id: result.id,
                        ordem: order[i],
                    })
                }

                const alert = {
                    message: 'O curso foi publicado com sucesso!'
                }
                res.status(200).json(alert)
            } else {

                // Publish a single module
                const courseModule = await Modulo.create({
                    nome: moduleName,
                    playlist: playlist,
                    cusro_mod_id: result.id,
                    ordem: order,
                })
              
                const alert = {
                    message: 'O curso foi publicado com sucesso!'
                }
                res.status(200).json(alert)
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
            
            const alert = {
                message: 'O curso foi publicado com sucesso!'
            }
            res.status(200).json(alert)
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