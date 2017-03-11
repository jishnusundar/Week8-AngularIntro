

//Display the Home page
module.exports.displayHome = (req,res) => {
     res.render('content/index', {
    title: 'Home',
    games: '',
  displayName : req.user ? req.user.displayName : ''
   });
}


//Display Contact page
module.exports.displayContact = (req,res) => {
      res.render('content/contact', {
    title: 'Contact',
    games: '',
  displayName : req.user ? req.user.displayName : ''
   });
}