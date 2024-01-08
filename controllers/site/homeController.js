/**IMPORTS CONGING ============================================*/


//Index
const index = (req, res) => {
    res.render('site/home/index', {title: 'Home'})
}

/**EXPORTS CONFIG ============================================== */
module.exports = {
    index
}