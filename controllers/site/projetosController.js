/**IMPORTS CONFING ========================================================== */
const body = require('body-parser')

//index


//Project Public
const publicarPojeto = (req, res) => {
    res.render('site/projetos/publicar_projeto', { title: 'Publicar Projetos' })
}

const store = async (req, res) => {
    res.send(req.body)
}

/**EXPORT ============================================================= */
module.exports = {
    publicarPojeto,
    store
}