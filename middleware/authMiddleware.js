/** IMPORTS ============================================================*/
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const Freelancer = require('../models/Freelancer');



// requireAuth
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web exixts and verified
    if(token){
        jwt.verify(token, 'emalengue app', (err, decodedToken) => {

            if(err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })

    } else {
        res.redirect('/login')
    }
}

//Check Current Useer
const checkUsser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'emalengue app', async (err, decodedToken) => {

            if(err) {
                console.log(err.message);
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken);
                const user = await User.findByPk(decodedToken.id, {
                    include: {
                        model: Freelancer
                    }
                })
                req.authUser = user
                res.locals.authUser = user
    
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}


module.exports = {
    requireAuth,
    checkUsser
}