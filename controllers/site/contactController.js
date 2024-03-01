/**IMPORTS CONGING ============================================*/

//index
const index = (req, res) => {
    res.render('site/contacts/contact', {title: 'eMaLENGUE | Contatos'})
}


/**EXPORT ================================================== */
module.exports = {
    index
}