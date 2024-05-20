/** Import config ======================================================*/

const Curso = require("../../models/Curso");


// Idenx ===============================================================
const index = (req, res) => {
    res.render('admin/cursos/index', {
        title: 'eMaLENGUE | Cursos',
        layout: 'main2',
    })
}





/** PUBLICAR CURSO METHOD ======================== */
const publicarCurso = async (req, res) => {
    //CURSO ATTBUITES
    const name = " ";
    const descricao = ' ';
    const categoria_id = ' ';
    const user_id = ' ';
    const custo = ' ';
    const nivel = ' ';

    // CREATING CURSO INSTANCE
    await Curso.create({
        name: name,
        descricao: descricao,
        categoria_id: categoria_id,
        user_id: user_id,
        custo: custo,
        nivel: nivel,
    }).then( result => {
        console.log(result.toJSON())
    }).catch( error => {
        console.error('Algo está errado: ' + error);
    })
}

module.exports = {
    index,
    publicarCurso,
}