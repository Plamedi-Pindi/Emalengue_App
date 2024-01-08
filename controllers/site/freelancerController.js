/**IMPORTS CONGING ============================================*/

//index
const index = (req, res) => {
    res.render('site/freelancer/index', {title: 'Freelancers'})
}



/**EXPORTS CONFIG ============================================== */
module.exports = {
    index
}