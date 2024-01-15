/**IMPORT CONFIG ========================================================= */
const Sequelize = require('sequelize')
const dotenv = require('dotenv')

/** Dotenv Config ========================================================= */
dotenv.config({path: './env'})

const sequelize = new Sequelize(
    'emalengue', 
    'root',
    process.env.PASSWORD, 
    {
    host: process.env.HOST,
    dialect:'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log('App connected to DB!');
}).catch((err) => {
    console.log(`DB connection errer: ${err}`);
})

module.exports = {
    Sequelize,
    sequelize
}