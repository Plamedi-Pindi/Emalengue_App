/**MODULES IMPORTING ===================================================== */
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { checkUsser} = require('./middleware/authMiddleware')



//Routes imports
const homeRoute = require('./routes/site/homeRoute')
const freelancerRoute = require('./routes/site/freelancerRoute')
const cursoRoute = require('./routes/site/cursoRoute')
const contactRoute = require('./routes/site/contactRoute')
const freeProfileRoute = require('./routes/site/freeProfileRoute')
const projetoRoute = require('./routes/site/projetosRoute')
const mainAdminRoute = require('./routes/admin/mainRoute')
const adminFreeRoute = require('./routes/admin/freelancerRoute')
const adminProjetRoute = require('./routes/admin/projetoRoute')
const loginRoute = require('./routes/auth/loginRoute')
const registerRoute = require('./routes/auth/registerRoute')



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

/**Middleware ===================================================== */
//Body Parser Config
app.use(bodyParser.urlencoded({ extended: 'false' }))
app.use(bodyParser.json())
// Static file
app.use(express.static('public'))
// Cookie parser
app.use(cookieParser())


/**SERVER =================================================================== */
app.listen(8080, () => {
    console.log('Server up!');
})

/**ROUTES MIDDLEWARE ======================================================== */
app.get('*', checkUsser)
// For Site
app.use('/', homeRoute)
app.use('/freelancer', freelancerRoute)
app.use('/cursos', cursoRoute)
app.use('/contatos', contactRoute)
app.use('/perfildofreelancer', freeProfileRoute)
app.use('/projetos', projetoRoute)
// For Dashboard
app.use('/dashboard', mainAdminRoute)
app.use('/dashboard/freelancer', adminFreeRoute)
app.use('/dashboard/projeto', adminProjetRoute) 
// For Auth
app.use('/cadastrar', registerRoute)
app.use('/', loginRoute)


