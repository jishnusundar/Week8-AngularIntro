//modules required for routing
let express = require('express');
let router = express.Router();

let usersController = require('../controllers/users');

/* GET /Login - render the login view*/
router.get('/login',(req, res, next) => {
  // check to see  if the user is not already logged index
usersController.displayLogin(req,res);
}).post('/login', usersController.processLogin());

// GET /register - render the register page
router.get('/register',(req,res,next) => {
//check if the user is not already logged in 
usersController.displayRegistration(req,res);
}).post('/register', (req, res, next) =>  {
usersController.processRegistration(req,res);
});

//GET /logout - Logout the user and redirect to the home page
router.get('/logout', (req,res,next) => {
usersController.performLogout(req,res);
});

module.exports = router;