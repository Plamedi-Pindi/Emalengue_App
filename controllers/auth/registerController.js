/**IMPORTS CONFIG ==================================================== */
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Index
const index = (req, res) => {
    res.render('auth/register', {title: 'Cadastrar-se'})
}

// Token 
const maxAge =3 * 24 * 120;
const createToken = (id) => {
    return  jwt.sign({id}, 'emalengue app', {expiresIn: maxAge})
}

//Store
const store = async (req, res) => {
    const password = req.body.password
    const encrypted = await bcrypt.hash(password, 10) // Hashed Password
    const email =  req.body.email
   const create =  await User.create({
        nome: req.body.name,
        email: req.body.email,
        password: encrypted 

    }).then( async() => {
        //cookie
        const user =  await User.findOne({row:true, where: { email } })
        const token = createToken(user.id) 
         res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

        res.redirect('/')
        
    }).catch((err) => {
        console.log('Erro ao cadastrar! ' + err);
    })

}

/**EXPORT =============================================================== */
module.exports = {
    index,
    store
}