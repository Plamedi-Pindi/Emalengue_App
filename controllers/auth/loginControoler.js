/**IMPORTS ================================================ */
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { get } = require('express/lib/response')
const jwt = require('jsonwebtoken')



//index
const index = (req, res) => {
    res.render('auth/login', { title: 'Login' })
}

// Token 
const maxAge = 3 * 24 * 120;
const createToken = (id) => {
    return jwt.sign({ id }, 'emalengue app', { expiresIn: maxAge })
}

//Store
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ row: true, where: { email } })
        if (user) {
            const auth = await bcrypt.compare(password, user.password)

            if (auth) {
                //Token
                const token = createToken(user.id)
                // cookie
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                // res.redirect('/')
                res.status(200).json({user})
                console.log("##### Certo #######")

            } else {
                const id = 1
                const error = "Senha invalida!"
                const Message = [id, error]
                res.status(401).json(Message)
                console.log('######### Senha errada ############' )
            }

        } else {
            const id = 2
            const error = "Não há uma conta registrada com esse email!"
            const Message = [id, error]
            res.status(401).json(Message)

        }


    } catch (error) {
        console.log("Ocorreu um err: " + error);
        // res.status(402).json(error) 
    }

}

// Logout
const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}


/**EXPORT =============================================================== */
module.exports = {
    index,
    login,
    logout
}