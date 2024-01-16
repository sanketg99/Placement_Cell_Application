const passport = require('passport');
const User = require('../models/userSchema');
const LocalStrategy = require('passport-local').Strategy;



// authentication using passport
const local = new LocalStrategy({ usernameField: 'email' }, async function (email, password, done) {
  try{
    const user= await User.findOne({ email }); 
    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }
    return done(null, user);
  }
  catch(error){
    
      console.log(`Error in finding user: ${error}`);
      return done(error);
  }
});

passport.use('local', local);

//serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      return done(null, user);
  } catch (error) {
    console.log('Error in finding user--> Passport');
      return done(error);
  }
});



// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/signin');
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
