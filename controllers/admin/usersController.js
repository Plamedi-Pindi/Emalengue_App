// Import Config
const User = require('../../models/User')

//INDEX 
const index = async (req, res) => {
    await User.findAll().then(result => {

        res.render('admin/users/users', {
            title: 'eMaLENGUE | Users',
            layout: 'main2',
            users: result
        })
    })
}

const changeRole = async (req, res) => {
    const id = req.params.id
    const role = req.body.role;
    await User.findOne({ where: { id: id } }).then(async result => {
        const user = result
        user.update({ role: role })
        res.status(200).json({ message: 'O papel do usário foi alterado com sucesso!' })
    })
    console.log(req.body, id);
}

const remove = async (req, res) => {
    const id = req.params.id
    await User.findOne({ where: { id: id } }).then(async result => {
        result.destroy()
        res.redirect('/dashboard/users')
    })
}

// EXPORT
module.exports = {
    index,
    changeRole,
    remove,
}