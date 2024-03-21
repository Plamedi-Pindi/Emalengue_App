// Import config =============================================================
require('./googleAuth2')
const session = require('express-session')


// FUNCTIONS ==========================================================

// const autehGoogle = (req, res, next) => {
    
// }

// const callBack = (req, res, next) => {
    
// }

const protected = (req, res, next) => {
    let name = req.user.displayName
    let email = req.user.email
    let picture = req.user.photo
    // res.send(name + ' <br/> ' + email + ' <br/> ' +  ' <br/> ' + `<img src = "${req.user.picture}" >`  + req.user.picture)
    res.send(req.user)
}

const failure = (req, res, next) => {
    res.send('Ocorreu um erro!')
}



module.exports = {
    // callBack,
    // autehGoogle,
    protected,
    failure,
}