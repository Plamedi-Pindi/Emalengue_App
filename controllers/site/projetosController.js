/**IMPORTS CONFING ========================================================== */


//index


//Project Public
const publicarPojeto = (req, res) => {
res.render('site/projetos/publicar_projeto', {title: 'Publicar Projetos'})
}


/**EXPORT ============================================================= */
module.exports = {
    publicarPojeto
}