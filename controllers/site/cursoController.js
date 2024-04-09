/**IMPORTS CONGING ============================================*/

//index
const index = (req, res) => {
    res.render('site/course/index', {title: 'eMaLENGUE | Cursos'})
}
const detail = (req, res) => {
    res.render('site/course/details/details', {title: 'eMaLENGUE | Detalhes do Curso'})
}

/**EXPORTS CONFIG ============================================== */
module.exports ={
    index,
    detail
}