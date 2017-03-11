// modules required for routing
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the game model
let game = require('../models/games');

// displays the Users List page
module.exports.displayGamesList = (req, res) => {
  // find all games in the games collection
  game.find( (err, games) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('games/index', {
        title: 'Games',
        games: games,
        displayName: req.user.displayName
      });
    }
  });
}

module.exports.displayAddPage = (req, res) => {
  res.render('games/details', {
    title: "Add a new Game",
    games: '',
    displayName: req.user.displayName
  });
}

// create a new game and insert it into the db
module.exports.CreateNewGame = (req, res) => {
   let newGame = game({
      "name": req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
    });

    game.create(newGame, (err, game) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/games');
      }
    });
}

// displays the Edit page
module.exports.displayEditPage = (req, res) => {
  try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one game by its id
      game.findById(id, (err, games) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the game details view
          res.render('games/details', {
              title: 'Game Details',
              games: games,
              displayName: req.user.displayName
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
}

// update a game and save it to the db
module.exports.UpdateGame = (req, res) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedGame = game({
       "_id": id,
      "name": req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
    });

    game.update({_id: id}, updatedGame, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the game List
        res.redirect('/games');
      }
    });
}

// Delete a game from the db
module.exports.DeleteGame = (req, res) => {
  // get a reference to the id from the url
    let id = req.params.id;

    game.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the games list
        res.redirect('/games');
      }
    });
}