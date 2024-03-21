/**IMPORTS CONFING ========================================================== */
const body = require('body-parser')
const Habilidade = require('../../models/Habilidade')
const Categoria = require('../../models/Categoria')

//index


//Project Public
const publicarPojeto = async (req, res) => {
    await Habilidade.findAll().then(async habilidades => {
        const categoria = await Categoria.findAll()

        res.render('site/projetos/publicar_projeto', {
            title: 'eMALENGUE | Publicar Projetos',
            habilidades: habilidades,
            categorias: categoria, 
        })
    })
}

const store = async (req, res) => {
    res.send(req.body)
}

/**EXPORT ============================================================= */
module.exports = {
    publicarPojeto,
    store
}