// modules required for routing
let express = require('express');
let router = express.Router();

// enforces security by checking if user has logged in
let usersController = require('../controllers/users');

// require the games controller
let gamesController = require('../controllers/games');

/* GET games List page. READ */
router.get('/', usersController.requireAuth, (req, res, next) => {
  gamesController.displayGamesList(req, res);
});

router.get('/add', usersController.requireAuth, (req, res, next) => {
  //  GET the Game Details page in order to add a new Game
  gamesController.displayAddPage(req, res);
}).post('/add', usersController.requireAuth, (req, res, next) => {
  // POST process the Game Details page and create a new Game - CREATE
  gamesController.CreateNewGame(req, res);
});

router.get('/:id', usersController.requireAuth, (req, res, next) => {
  // GET the Game Details page in order to edit a new Game
  gamesController.displayEditPage(req, res);
}).post('/:id', usersController.requireAuth, (req, res, next) => {
  // POST - process the information passed from the details form and update the document
  gamesController.UpdateGame(req, res);
});

// GET - process the delete by user id
router.get('/delete/:id', usersController.requireAuth, (req, res, next) => {
  gamesController.DeleteGame(req, res);
});


module.exports = router;