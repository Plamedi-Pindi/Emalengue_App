/**IMPORTS CONFIG ==================================================== */
const User = require('../../models/User') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UniqueConstraintError } = require('sequelize')



//Index
const index = (req, res) => {
    res.render('auth/register', { title: 'Cadastrar-se' })
}

// Token 
const maxAge = 3 * 24 * 120;
const createToken = (id) => {
    return jwt.sign({ id }, 'emalengue app', { expiresIn: maxAge })
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('site/error', { error: err })

}
//Store
const store = async (req, res, next) => {

    const password = req.body.password
    const encrypted = await bcrypt.hash(password, 10) // Hashed Password
    const email = req.body.email
    const name = req.body.name

    // Início do método para criara um usuário 
    try {
        const create = await User.create({
            nome: name,
            email: email,
            password: encrypted
     
        }).then(async () => {
            //cookie
            const user = await User.findOne({ row: true, where: { email } })
            const token = createToken(user.id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(200).json({user})
    
        }).catch((err) => {
            if(err instanceof UniqueConstraintError){
                const  mensagem = 'Já existe uma conta registrada com este email!'
                const id = 1
                const Erro = [id, mensagem]
                res.status(400).json(Erro)
            } 
            // errorHandler(err, req, res, next)
        })  
    } catch (error) {
        console.log("Fetch Error Back: ", error);
        res.status(400).json(error)
    }
    


}

/**EXPORT =============================================================== */
module.exports = {
    index,
    store
}