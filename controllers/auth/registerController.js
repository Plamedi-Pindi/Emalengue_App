/**IMPORTS CONFIG ==================================================== */


//Index
const index = (req, res) => {
    res.render('auth/register', {title: 'Cadastrar-se'})
}


/**EXPORT =============================================================== */
module.exports = {
    index
}