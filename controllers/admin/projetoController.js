/**IMPORTS CONFIG ===========================================================*/



//Create
const create = (reqe, res) => {
    res.render('admin/projetos/create/create', {
        layout: 'main2',
        title: 'Publicar Projeto'
    })
}



/**EXPORT ================================================================= */
module.exports = {
    create
}