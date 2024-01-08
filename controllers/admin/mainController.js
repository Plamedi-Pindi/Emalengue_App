/**IMPORTS CONFIG ===========================================================*/



//Index
const index = (reqe, res) => {
    res.render('admin/home/index', {
        layout: 'main2',
        title: 'Painel de Controlo'
    })
}



/**EXPORT ================================================================= */
module.exports = {
    index
}