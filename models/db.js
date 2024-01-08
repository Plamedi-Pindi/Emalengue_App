/**IMPORT CONFIG ================================================= */
const Sequelize = require('sequelize')
const sequelize = new Sequelize('emalengue', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('App connected to DB!');
}).catch((err) => {
    console.log(`DB connection errer: ${err}`);
})

module.exports = {
    Sequelize,
    sequelize
}