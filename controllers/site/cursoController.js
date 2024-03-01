/**IMPORTS CONGING ============================================*/

//index
const index = (req, res) => {
    res.render('site/course/index', {title: 'eMaLENGUE | Cursos'})
}

/**EXPORTS CONFIG ============================================== */
module.exports ={
    index
}