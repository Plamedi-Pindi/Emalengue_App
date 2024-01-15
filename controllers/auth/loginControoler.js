/**IMPORTS ================================================ */
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//index
const index = (req, res) => {
    res.render('auth/login', {title: 'Login'})
}

// Token 
const maxAge =3 * 24 * 120;
const createToken = (id) => {
    return jwt.sign({id}, 'emalengue app', {expiresIn: maxAge})
}

//Store
const login = async (req, res) => {
    const {email, password} = req.body
    // if(password.length < 6){
    //     return res.status(400).send('<h3>A senha nao pode conter menos de 6 caracteres</h3>')
    // }
  
    try {
        const user = await User.findOne( {row:true,  where: { email } })
        if(user){
            const auth = await bcrypt.compare(password, user.password)
            if(auth) {
                //Token
                const token = createToken(user.id) 
                // //cookie
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
                res.redirect('/')
                
            } else {
                res.send('Senha errada')
            }
            
        } else {
            
            res.send('email errado')
        }
        
        
    } catch (error) {
        
    }
     
}

// Logout
const logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}


/**EXPORT =============================================================== */
module.exports = {
    index,
    login,
    logout
}