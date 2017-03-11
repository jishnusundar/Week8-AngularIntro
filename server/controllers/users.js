// modules required for routing
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// displays login page
module.exports.displayLogin = (req, res) => {
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      games: '',
      messages: req.flash('error'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/games'); // redirect to games list
  }
}

module.exports.processLogin = () => {
    return passport.authenticate('local', {
      successRedirect: '/games',
      failureRedirect: '/users/login',
      failureFlash: true
  });
}

// displays the register page
module.exports.displayRegistration = (req, res) => {
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the registration page
      res.render('auth/register', {
      title: "Register",
      games: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/games'); // redirect to games list
  }
}

// processes the user registration
module.exports.processRegistration = (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      //password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if(err) {
        console.log('Error inserting new user');
        if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register",
          games: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/games');
      });
    });
}

// create a function to check if the user is authenticated
module.exports.requireAuth = (req, res, next) => {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/users/login');
  }
  next();
}

// processes the logout request
module.exports.performLogout = (req, res, next) => {
   req.logout();
    res.redirect('/'); // redirect to the home page
}