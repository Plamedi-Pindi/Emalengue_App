/**IMPORTS CONGING ============================================*/

//index 
const index = (req, res) => {
    res.render('site/freeProfile/freelancer-profile', {title: 'Perfil do Freelancer'})
}

/**EXPORT ===================================================== */
module.exports = {
    index
}