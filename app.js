/**MODULES IMPORTING ===================================================== */
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

//Routes imports
const homeRoute = require('./routes/site/homeRoute')
const freelancerRoute = require('./routes/site/freelancerRoute')
const cursoRoute = require('./routes/site/cursoRoute')
const contactRoute = require('./routes/site/contactRoute')
const freeProfileRoute = require('./routes/site/freeProfileRoute')
const projetoRoute = require('./routes/site/projetosRoute')
const registerRoute = require('./routes/auth/registerRoute')
const mainAdminRoute = require('./routes/admin/mainRoute')
const adminFreeRoute = require('./routes/admin/freelancerRoute')
const adminProjetRoute = require('./routes/admin/projetoRoute')



/**  Handlebars Config =====================================================*/
app.engine('hbs', handlebars.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    // partialsDir: 'views/partials'

}))
app.set('view engine', 'hbs')

/**Body Parser Config ===================================================== */
app.use(bodyParser.urlencoded({
    extended: 'false' 
}))
app.use(bodyParser.json())


/**SERVER =================================================================== */
app.listen(8080, () => {
    console.log('Server up!');
})
// STATIC FILE CONFIG
app.use(express.static('public'))

/**ROUTES MIDDLEWARE ======================================================== */
// For Site
app.use('/', homeRoute)
app.use('/freelancer', freelancerRoute)
app.use('/cursos', cursoRoute)
app.use('/contatos', contactRoute)
app.use('/perfildofreelancer', freeProfileRoute)
app.use('/projetos', projetoRoute)
app.use('/cadastrar', registerRoute)
// For Dashboard
app.use('/dashboard', mainAdminRoute)
app.use('/dashboard/freelancer', adminFreeRoute)
app.use('/dashboard/projeto', adminProjetRoute) 