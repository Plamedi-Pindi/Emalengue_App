/**MODULES IMPORTING ===================================================== */
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { checkUsser } = require('./middleware/authMiddleware')
const Habilidade = require('./models/Habilidade')
const Categoria = require('./models/Categoria')
const passport = require('passport')
const session = require('express-session')
require('./models/associations')
require('./controllers/auth/googleAuth2')
require('dotenv').config()

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
const { sequelize } = require('./models/db')
const adminCursoRoute = require('./routes/admin/cursoRoute')
const googleRoute = require('./routes/auth/googleRoute')
const crowdfunderRoute = require('./routes/site/crowdfunderRoute')
const profileRoute = require('./routes/admin/profileRoute')




/**  Handlebars Config =====================================================*/


app.engine('hbs', handlebars.engine({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {

    ifIqual: (v1, v2, options) => {
      if (v1 === v2) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }

    },
   

  }
  // partialsDir: 'views/partials',
}))
app.set('view engine', 'hbs')
// app.set('views', './views')


// GOOGLE AUTH =======================================================
const maxAge = 60000*60*3
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: maxAge }
}))

app.use(passport.initialize()) 
app.use(passport.session())


app.get('/auth/google',
  passport.authenticate('google', {
    scope:
      [
        'email',  
        'profile',
        // 'https://www.googleapis.com/auth/user.phonenumbers.read',
        // 'https://www.googleapis.com/auth/user.addresses.read',
      ]
  }
  ));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google/failure'
  }));

app.get('/sair', (req, res) => {
  req.logout( function(err) {
    res.send('Good bay')
    req.session.destroy( function (err) {})

  })
})

/**Middleware ===================================================== */
//Body Parser Config
app.use(bodyParser.urlencoded({ extended: 'false' }))
app.use(bodyParser.json())
// Static file
app.use(express.static('public'))
// Cookie parser
app.use(cookieParser())



/**SERVER =================================================================== */
// sequelize.sync()

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
app.use('/crowdfunder', crowdfunderRoute)
// For Dashboard
app.use('/dashboard', mainAdminRoute)
app.use('/dashboard/freelancer', adminFreeRoute)
app.use('/dashboard/projeto', adminProjetRoute)
app.use('/dashboard/cursos', adminCursoRoute)
app.use('/dashboard/user/profile', profileRoute)
// For Auth
app.use('/cadastrar', registerRoute)
app.use('/', loginRoute)
app.use('/auth', googleRoute)




        