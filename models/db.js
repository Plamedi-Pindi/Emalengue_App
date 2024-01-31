/**IMPORT CONFIG ========================================================= */
const Sequelize = require('sequelize')
const dotenv = require('dotenv')


/** Dotenv Config ========================================================= */
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
    host: process.env.HOST, 
    dialect: process.env.DB_DIALECT
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