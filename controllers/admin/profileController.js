// Imports Config ============================================================
const User = require('../../models/User')
const Freelancer = require('../../models/Freelancer')
const bcrypt = require('bcrypt')

const index = async (req, res) => {
    const userId = req.params.id

    await User.findOne({ where: { id: userId } }).then(user => {
        res.render('admin/profiles/profile', {
            title: 'eMaLENGUE | Profile',
            layout: 'main2',
            profile: user,
        })
    }).catch(err => {
        console.error(err.message)
    })
}

const update = async (req, res) => {
    // Config
    const oldpsw = req.body.password
    const userId = req.params.id
    const user = await User.findOne({ where: { id: userId}})

    if (oldpsw) {
        const auth = await bcrypt.compare(oldpsw, user.password)
        if(auth) {

            const alert = {
                id: 1
            }
            res.status(200).json(alert)

        } else {
            const alert = {
                id: 0,
                message: 'A senha está incorreta!'
            }
            res.status(400).json(alert)
        }

    }

}


module.exports = {
    index,
    update
}