/**IMPORTS CONGING ============================================*/

//index
const index = (req, res) => {
    res.render('site/course/index', {title: 'Cursos'})
}

/**EXPORTS CONFIG ============================================== */
module.exports ={
    index
}