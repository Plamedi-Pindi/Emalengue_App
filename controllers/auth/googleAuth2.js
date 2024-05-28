
const passport = require('passport');
const User = require('../../models/User');
require('dotenv').config()

const GoogleStrategy = require('passport-google-oauth2').Strategy;
// require('express-session')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://localhost:8080/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {

     User.findOne({ 
      where: { email: profile.email}
    }).then( user => {
      if (user) {
        return done (null, user)
      } else {
        User.create({
          nome: profile.displayName,
          email: profile.email,
          password: profile.id,
          role: 'user'
        }).then( user => {
          return done (null, user)
        });
      }
    });
      
  }

));

/** 
 * SerializeUser method is responsible to get user information
*/
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})


