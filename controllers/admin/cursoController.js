/** Import config ======================================================*/


// Idenx ===============================================================
const index = (req, res) => {
    res.render('admin/cursos/index', {
        title: 'eMaLENGUE | Cursos',
        layout: 'main2',
    })
}

module.exports = {
    index,
}