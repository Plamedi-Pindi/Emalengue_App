/**IMPORTS CONFIG ===========================================================*/
const Projeto = require('../../models/Projeto')


//Create
const create = (reqe, res) => {
    res.render('admin/projetos/create/create', {
        layout: 'main2',
        title: 'Publicar Projeto'
    })
}

//Store
const store = ((req, res) => {
    Projeto.create({
        nome: req.body.nome,
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        habilidade: req.body.habilidades,
        prazo: req.body.prazo,
    }).then(() => {
        res.redirect('/dashboard/projeto/novo_projeto')
    }).catch((err) => {
        console.log('Erro ao criar Projeto!' + err);
    })

})



/**EXPORT ================================================================= */
module.exports = {
    create,
    store,
}