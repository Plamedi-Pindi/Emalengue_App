/** IMPORTS ============================================================*/
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const Freelancer = require('../models/Freelancer');
require('express-session')


// google auth ==========================================
const isLogged = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'emalengue app', (err, decodedToken) => {

            if (err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })

    } else if (req.user) {
        next()
    } else {
        res.redirect('/login')
    }

    // req.user ? next() : res.sendStatus(401)
}

//Check Current Useer
const checkUsser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'emalengue app', async (err, decodedToken) => {

            if (err) {
                console.log(err.message);
                res.locals.user = null
                next()
            } else { 
                console.log(decodedToken);
                const user = await User.findByPk(decodedToken.id)
                req.user = user 
                res.locals.user = user
                
                next()
            }
            
        })
    } else if (req.user) {
        res.locals.user = req.user
        req.user = req.user 
        next()
    } else {
        res.locals.user = null
        
        next()
    }
}

// MIDDLEWARE TO PROTECTE A ROUTE ============================================================ 
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    }
}


module.exports = {
    checkUsser,
    isLogged,
    authorizeRole,
}