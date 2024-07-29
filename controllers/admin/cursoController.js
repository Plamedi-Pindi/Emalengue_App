/** Import config ======================================================*/

const Curso = require("../../models/Curso");
const multer = require('multer');
const body = require('body-parser');
const Categoria = require('../../models/Categoria');
const Modulo = require('../../models/Modulo');
const curso = require("../../routes/admin/cursoRoute");
const youtubeEmbed = require('youtube-embed');
const Inscricao = require('../../models/Inscricao');
const Aluno = require('../../models/Aluno');
const User = require("../../models/User");
const country = require('country-state-city').Country;
const Telefone = require('../../models/Telefone');
const { Sequelize } = require("../../models/db");



// Idenx ===============================================================
const index = async (req, res) => {
    const userAuth = req.user;

    if (userAuth.role === 'admin') {
        const page = req.query.page || 1; // Página atual
        const pageSize = 9; // Número de itens por página
        
        try {

            const { count, rows } = await Curso.findAndCountAll({
                order: [
                    ['id', 'DESC'],
                ],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });

            const categoria = await Categoria.findAll();
            
            const totalPages = Math.ceil(count / pageSize);

            // Calcular as condições para exibir os links de página anterior e próxima
            const showPrevious = page > 1;
            const showNext = page < totalPages;

            let proxima = parseInt(page) + 1;
            let anterior = parseInt(page) - 1;

            // To list all Enrolled student
            const enrolled = await Inscricao.findAll();
            const enrolNumber = parseInt(enrolled.length);


            let userRole = false;

            if (userAuth.role === 'admin') {
                userRole = true;
            }

            res.render('admin/cursos/index', {
                title: 'eMaLENGUE | Cursos',
                layout: 'main2',
                cursos: rows,
                currentPage: page,
                totalPages,
                showPrevious,
                showNext,
                proxima,
                anterior,
                categoria: categoria,
                enrolNumber: enrolNumber,
                userRole: userRole,
            });

        } catch (err) {
            console.error('Erro ao buscar cursos:', err);
        }

    } else {
        // FOR ENROLLED USER =========================================================
        const page = req.query.page || 1; // Página atual
        const pageSize = 3; // Número de itens por página
        try {

            const aluno = await Aluno.findOne({
                where: { user_id: userAuth.id },
                include: [
                    {
                        model: Curso,
                        as: 'cursos',
                        include: [
                            { model: Categoria }
                        ]
                    }
                ],
            });

            let cursos = [];
            cursos = await aluno.getCursos({
                order: [
                    ['id', 'DESC'],
                ],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            let count = aluno.cursos.length;

            //
            const categoria = await Categoria.findAll();
            //
            const totalPages = Math.ceil(count / pageSize);

            // Calcular as condições para exibir os links de página anterior e próxima
            const showPrevious = page > 1;
            const showNext = page < totalPages;

            let proxima = parseInt(page) + 1;
            let anterior = parseInt(page) - 1;

            // To list all Enrolled student
            const enrolled = await Inscricao.findAll();
            const enrolNumber = parseInt(enrolled.length);


            let userRole = false;
            let isAluno = false;

            if (userAuth.role === 'admin') {
                userRole = true;
            }
            if (userAuth.id === aluno.user_id) {
                isAluno = true;
            }


            res.render('admin/cursos/index', {
                title: 'eMaLENGUE | Cursos',
                layout: 'main2',
                cursos: cursos,
                currentPage: page,
                totalPages,
                showPrevious,
                showNext,
                proxima,
                anterior,
                categoria: categoria,
                enrolNumber: enrolNumber,
                userRole: userRole,
                isAluno: isAluno,
            });

        } catch (err) {
            console.error('Erro ao buscar cursos:', err);
        }
    }

}

// HEARCH THROUGH CATEGORY METHOD ========================================================
const searching = async (req, res) => {
    const userAuth = req.user;
    const item = req.params.id;

    if (userAuth.role === 'admin') {
        const page = req.query.page || 1; // Página atual
        const pageSize = 9; // Número de itens por página

        try {

            const { count, rows } = await Curso.findAndCountAll({
                where: {
                    categoria_id: item
                },
                order: [
                    ['id', 'DESC'],
                ],

                limit: pageSize,
                offset: (page - 1) * pageSize
            });
            // Get all categories
            const categoria = await Categoria.findAll();
            // Find the selected category
            const selectedCategory = await Categoria.findOne({ where: { id: item } });

            const totalPages = Math.ceil(count / pageSize);

            // Calcular as condições para exibir os links de página anterior e próxima
            const showPrevious = page > 1;
            const showNext = page < totalPages;

            let proxima = parseInt(page) + 1;
            let anterior = parseInt(page) - 1;

            res.render('admin/cursos/search/searching', {
                title: 'eMaLENGUE | Cursos',
                layout: 'main2',
                cursos: rows,
                currentPage: page,
                totalPages,
                showPrevious,
                showNext,
                proxima,
                anterior,
                categoria: categoria,
                selectedCategory: selectedCategory,
            });

        } catch (err) {
            console.error('Erro ao buscar cursos:', err);
        }
    } else {
        const page = req.query.page || 1; // Página atual
        const pageSize = 3; // Número de itens por página

        // try {

        //     const aluno = await Aluno.findOne({
        //         where: { user_id: userAuth.id },
        //         include: [
        //             {
        //                 model: Curso,
        //                 as: 'cursos',
        //                 include: [
        //                     { model: Categoria }
        //                 ],
        //                 where:{id: item}
        //             }
        //         ],
        //     });

        //     let cursos = [];
        //     cursos = await aluno.getCursos({
        //         order: [
        //             ['id', 'DESC'],
        //         ],
        //         limit: pageSize,
        //         offset: (page - 1) * pageSize,
        //     });

        //     let count = aluno.cursos.length;

        //     //
        //     const categoria = await Categoria.findAll();
        //     //
        //     const totalPages = Math.ceil(count / pageSize);

        //     // Calcular as condições para exibir os links de página anterior e próxima
        //     const showPrevious = page > 1;
        //     const showNext = page < totalPages;

        //     let proxima = parseInt(page) + 1;
        //     let anterior = parseInt(page) - 1;

        //     // To list all Enrolled student
        //     const enrolled = await Inscricao.findAll();
        //     const enrolNumber = parseInt(enrolled.length);


        //     let userRole = false;

        //     res.render('admin/cursos/index', {
        //         title: 'eMaLENGUE | Cursos',
        //         layout: 'main2',
        //         cursos: cursos,
        //         currentPage: page,
        //         totalPages,
        //         showPrevious,
        //         showNext,
        //         proxima,
        //         anterior,
        //         categoria: categoria,
        //         enrolNumber: enrolNumber,
        //         userRole: userRole,
        //         // isAluno: isAluno,
        //     });

        // } catch (err) {
        //     console.error('Erro ao buscar cursos:', err);
        // }
    }
}

// SEARCH GENERAL ======================================================
const search = async (req, res) => {
    const { query } = req.query;
    let cursos = [];
    cursos = await Curso.findAll({
        where: {
            name: {
                [Sequelize.Op.like]: `%${query}%`
            }
        }
    });
    console.log(cursos);
    res.json(cursos);

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

// DELETE METHOD ========================================================
const courseDelete = async (req, res) => {
    const item = req.params.id;

    // const selectedCat = await Curso.findOne({ where: { id: item } });
    await Curso.destroy({ where: { id: item } });
    res.status(200).redirect('/dashboard/cursos');
}


// COURSE DETAILS ======================================================= 
const courseDetails = async (req, res) => {
    const userAuth = req.user
    const item = req.params.id;

    await Curso.findOne({
        where: { id: item },
        include: [
            { model: Modulo },
            { model: Categoria },
            { model: Aluno, as: 'alunos' },
        ],
        // raw: true,
        // nest: true
    }).then(async result => {

        // Get logged user
        const authUser = req.user;
        // Module length 
        const moduloLengtth = result.modulos.length;
        // To list all Enrolled student
        const enrolled = result.alunos.length;
        // To find a student
        const student = await Aluno.findOne({ where: { user_id: authUser.id } });
        // Checks if the auth user is enrolled
        let isEnrolled = false;
        const enrol = await Inscricao.findOne({
            where: {
                curso_id: item,
                aluno_id: student.id
            }
        });

        if (student || authUser.role == 'admin') {
            isEnrolled = true;
        }

        let userRole = false;

        if (userAuth.role === 'admin') {
            userRole = true;
        }
        res.render('admin/cursos/details/details', {
            title: 'eMaLENGUE | Detalhes do curso',
            layout: 'main2',
            curso: result,
            moduloLength: moduloLengtth,
            enrolNumber: enrolled,
            isEnrolled: isEnrolled,
            countries: country.getAllCountries(),
            userRole: userRole
        });
    });
}

// COURSE WHATCH PAGE =======================================================
const courseWhatch = async (req, res) => {
    const item = req.params.id;

    await Curso.findOne({
        where: { id: item },
        include: [
            { model: Modulo },
            { model: Categoria },
        ],
    }).then(result => {
        const user = req.user;
        let userRole = false;

        const moduloLength = result.modulos.length;
        let major = false;
        let iqual = false;

        if (moduloLength == 0) {
            iqual = true;
        }
        if (moduloLength > 0) {
            major = true;
        }

        if (user.role === 'admin') {
            userRole = true;
        }


        res.render('admin/cursos/details/show', {
            title: 'eMaLENGUE | Curso',
            layout: 'main2',
            curso: result,
            major: major,
            iqual: iqual,
            userRole: userRole

        });
    });
}


// MODULE WHATCH VIEW ===================================================
const modulosView = async (req, res) => {
    const cursoId = req.params.curso;
    const moduloId = req.params.modulo;

    await Curso.findOne({
        where: { id: cursoId },
        include: [
            { model: Modulo },
            { model: Categoria },
        ],
    }).then(async post => {

        const modulo = await Modulo.findOne({ where: { id: moduloId } });
        res.render('admin/cursos/details/moduloShow', {
            title: 'eMaLENGUE | Curso',
            layout: 'main2',
            curso: post,
            modulo: modulo
        });
    })
}


// COURSE ALUNOS =======================================================
const alunos = async (req, res) => {
    const item = req.params.id;

    await Curso.findOne({
        where: { id: item },
        include: [
            {
                model: Aluno,
                as: 'alunos',
                include: [
                    {
                        model: User,
                        include: [
                            { model: Telefone }
                        ]
                    }
                ]
            }
        ],
    }).then(async post => {

        const alunos = post.alunos;
        res.render('admin/cursos/details/subscription', {
            title: 'eMaLENGUE | Alunos',
            layout: 'main2',
            curso: post,
            alunos: alunos,
        });

    });
}


/** PUBLICAR CURSO  ========================0==============================*/

// MULTER *************************
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


// YUOTUBE EMBAD FUNCTION ****************************
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


//MAIN METHOD **********************
const publicarCurso = async (req, res) => {
    //CURSO ATTBUITES
    const name = req.body.title;
    const descricao = req.body.description;
    const categoria_id = req.body.category;
    const user_id = req.params.id;
    const custo = req.body.coust;
    let nivel = '';
    // const playlist = getEmbedUrl(req.body.playlist);
    const playlist = req.body.playlist;
    const data = req.body.date;
    const image = req.file.filename;

    console.log(getEmbedUrl(req.body.playlist));
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

        // // publish a course
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
        }).then(async result => {

            // Check if the module is or not an array
            if (Array.isArray(moduleName)) {

                for (let i = 0; i < moduleName.length; i++) {
                    // Publish modules
                    const courseModule = await Modulo.create({
                        nome: moduleName[i],
                        playlist: getEmbedUrl(playlist[i]),
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
                    playlist: getEmbedUrl(playlist),
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

        //CREATING CURSO INSTANCE
        await Curso.create({
            name: name,
            descricao: descricao,
            categoria_id: categoria_id,
            user_id: user_id,
            custo: custo,
            nivel: nivel,
            playlist: getEmbedUrl(playlist),
            data: data,
            hora: hora,
            image: image,
        }).then(result => {

            const alert = {
                message: 'O curso foi publicado com sucesso!'
            }
            res.status(200).json(alert)
        }).catch(error => {
            console.error('Algo está errado: ' + error);
        });
    }

}

// ENROL A STUDENT TO A COURSE =====================================================
const enrol = async (req, res) => {

    const curso_id = req.params.course;
    const authUser_id = req.params.user;
    console.log();
    const ocupation = req.body.ocupation;
    const phone = req.body.phone;
    const country = req.body.country;
    const province = req.body.province;

    const date = new Date();
    const year = date.getFullYear();
    const manth = date.getMonth();
    const day = date.getDate();

    if (authUser_id == null) {
        console.log('Need to log');
        const alert = {
            id: 1,
            message: "Need to log!"
        }
        res.status(200).json(alert);
    } else {

        const authUser = await User.findOne({ where: { id: authUser_id } });
        const existPhone = await Telefone.findOne({ where: { telefone: phone } });

        if (authUser.pais != country) {
            await authUser.update({
                pais: country
            });
        }
        if (authUser.provincia != province) {
            await authUser.update({
                provincia: province
            });
        }
        if (existPhone) {
            console.log('Already');
        } else {
            await Telefone.create({
                user_id: authUser_id,
                telefone: phone
            });

        }

        // Check if the user is already student
        const isStudent = await Aluno.findOne({
            where: { user_id: authUser_id }
        })
        if (isStudent) {

            // Check if the student is already enrolled into the selected course
            const isEnrolled = await Inscricao.findOne({
                where: {
                    aluno_id: isStudent.id,
                    curso_id: curso_id
                }
            });

            if (isEnrolled) {
                const alert = {
                    id: 1,
                    message: "Já se encontra inscrito neste curso!"
                }
                res.status(200).json(alert);
            } else {
                await Inscricao.create({
                    aluno_id: isStudent.id,
                    curso_id: curso_id,
                    data: date
                });
            }

        } else {
            await Aluno.create({
                user_id: authUser_id,
                ocupacao: ocupation,
            }).then(async post => {

                await Inscricao.create({
                    aluno_id: post.id,
                    curso_id: curso_id,
                    data: date
                });

            });
            const alert = {
                id: 2,
                message: "A Inscrição foi realizada com sucesso!"
            }
            res.status(200).json(alert);
        } // END INNER IF

    } // END MAIN IF


}

// UPDATE COURSE VIEW =====================================================
const cursoUpdate = async (req, res) => {
    const item = req.params.id;

    await Curso.findOne({
        where: { id: item },
        include: [
            { model: Categoria },
            { model: Modulo }
        ]
    }).then(async curso => {
        let thereIsModule = false;
        const modLenfth = curso.modulos.length;
        let Sequencia = 0;

        if (curso.modulos.length > 0) {
            Sequencia = curso.modulos[modLenfth - 1].ordem;
        }

        if (curso.modulos.length > 0) {
            thereIsModule = true;
        }

        const categoria = await Categoria.findAll();

        res.render('admin/cursos/update/update', {
            title: 'eMaLENGUE | Atualizar curso',
            layout: 'main2',
            curso: curso,
            thereIsModule: thereIsModule,
            modLenfth: modLenfth,
            categorias: categoria,
            Sequencia: Sequencia,
        });
    }).catch(err => {
        console.error(err)
    });

}

// UPDATE MULTER *************************
const storage2 = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "public/admin/img/cursos");
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload2 = multer({ storage: storage2 });
const imgUpload2 = upload.single('img');

// DELETE A FILE FUNCTION =====================================
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

// UPDATE COURSE PUT =====================================================
const updatePut = async (req, res) => {
    const item = req.params.id;
    //CURSO ATTBUITES
    const name = req.body.title;
    const descricao = req.body.description;
    const categoria_id = req.body.category;
    const user_id = req.params.id;
    const custo = req.body.coust;
    const nivel = req.body.nivel;
    const playlist = req.body.playlist;
    const data = req.body.date;
    let image = '';

    // Check if the course to be buplished going to or not have modules
    if (req.body.moduleName) {
        const moduleName = req.body.moduleName;
        const order = req.body.order

        // Find the selected course
        const curso = await Curso.findOne({
            where: { id: item },
            include: [
                { model: Modulo }
            ]
        });

        const moduloLength = parseInt(curso.modulos.length);
        // ==============================================
        if (req.file) {
            let path = 'public/admin/img/cursos'; // File path
            deleteFile(`${path}/${curso.image}`); // Delete olde file

            const img = req.file.filename;
            // Update a course
            await curso.update({
                name: name,
                descricao: descricao,
                custo: custo,
                nivel: nivel,
                image: img
            }).then(async result => {

                // Check if the module is or not an array
                if (Array.isArray(moduleName)) {
                    for (let i = moduloLength; i < moduleName.length; i++) {
                        // Publish modules
                        var courseModule = await Modulo.create({
                            nome: moduleName[i],
                            playlist: getEmbedUrl(playlist[i]),
                            cusro_mod_id: result.id,
                            ordem: order[i],
                        });
                    }
                    const alert = {
                        message: 'O curso foi atualizado com sucesso!'
                    }
                    res.status(200).json(alert)
                } else {

                    // Publish a single module
                    const courseModule = await Modulo.update({
                        nome: moduleName,
                        playlist: getEmbedUrl(playlist),
                        cusro_mod_id: result.id,
                        ordem: order,
                    })
                    const alert = {
                        message: 'O curso foi atualizado com sucesso!'
                    }
                    res.status(200).json(alert)
                }

            }).catch(error => {
                console.error('Algo está errado ao criar os modulos: ' + error);
            });

        } else {

            // Update a course
            await curso.update({
                name: name,
                descricao: descricao,
                custo: custo,
                nivel: nivel,
            }).then(async result => {

                // Check if the module is or not an array
                if (Array.isArray(moduleName)) {
                    for (let i = moduloLength; i < moduleName.length; i++) {
                        // Publish modules
                        var courseModule = await Modulo.create({
                            nome: moduleName[i],
                            playlist: getEmbedUrl(playlist[i]),
                            cusro_mod_id: result.id,
                            ordem: order[i],
                        });
                    }
                    const alert = {
                        message: 'O curso foi atualizado com sucesso!'
                    }
                    res.status(200).json(alert)
                } else {

                    // Publish a single module
                    const courseModule = await Modulo.update({
                        nome: moduleName,
                        playlist: getEmbedUrl(playlist),
                        cusro_mod_id: result.id,
                        ordem: order,
                    })
                    const alert = {
                        message: 'O curso foi atualizado com sucesso!'
                    }
                    res.status(200).json(alert)
                }

            }).catch(error => {
                console.error('Algo está errado ao criar os modulos: ' + error);
            });

        }  // ============================


    } else {

        //Get selected course
        const curso = await Curso.findOne({ where: { id: item } });
        if (req.file) {
            let path = 'public/admin/img/cursos'; // File path
            deleteFile(`${path}/${curso.image}`); // Delete olde file


            await curso.update({
                name: name,
                descricao: descricao,
                custo: custo,
                nivel: nivel,
                playlist: getEmbedUrl(playlist),
                image: req.file.filename,
            }).then(() => {

                const alert = {
                    message: 'O curso foi atualizado com sucesso!'
                }

                res.status(200).json(alert)
            }).catch(error => {
                console.error('Algo está errado: ' + error);
            });
        } else {

            // CREATING CURSO INSTANCE
            const curso = await Curso.findOne({ where: { id: item } })
            await curso.update({
                name: name,
                descricao: descricao,
                custo: custo,
                nivel: nivel,
                playlist: getEmbedUrl(playlist),

            }).then(() => {

                const alert = {
                    message: 'O curso foi atualizado com sucesso!'
                }
                res.status(200).json(alert)

            }).catch(error => {
                console.error('Algo está errado: ' + error);
            });

        } //and if
    } // End Main IF
}


// THIS METHOD IS ONLY TO DELETE A COURSE MODULES
/** Aftar a module be deleted it returns a message on update page but nothing */
const parcialModule = async (req, res) => {
    const item = req.body.moduleId;
    console.log(req.body);

    if (req.body.playlist || req.body.playlist == '') {
        const playlist = req.body.playlist
        const modulo = await Modulo.findOne({ where: { id: item } });
        modulo.update({
            playlist: playlist
        });
        const alert = {
            message: 'A playlist foi atualizado com sucesso!'
        }
        res.status(200).json(alert);

    } else {
        await Modulo.destroy({ where: { id: item } });
        const alert = {
            message: 'O modulo foi eliminado com sucesso!'
        }
        res.status(200).json(alert);
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
    searching,
    courseDelete,
    enrol,
    cursoUpdate,
    updatePut,
    imgUpload2,
    parcialModule,
    modulosView,
    search,
}