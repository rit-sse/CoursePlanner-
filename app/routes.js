var Plan = require('./models/plan');
module.exports = function(app,passport) {
  app.get('/', function(req,res) {
    res.render('index.html');
  });

  app.get('/Planner', function(req,res) {
    res.render('main.html');
  });

  app.post('/Planner/save', function(req,res) {
    Plan.create({
      title : req.body.title,
      json : req.body.years,
      user : req.body.user,
      done:false
    }, function(err, todo) {
      if (err)
	    res.send(err);

      Plan.find(function(err, todos) {
	    if (err)
	      res.send(err)
	    res.json(todos);
      });
    });

  });

  app.get('/Planner/plans', function(req, res) {
    Plan.find(function(err, plans) {
      if(err)
	    res.send(err)

      res.json(plans); // return all todos in JSON format
    });
  });

  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.post('/login', passport.authenticate('local-login'), function(req, res) {
    res.send(req.user);
  });

  app.post('/signup', passport.authenticate('local-signup'), function(req, res){
    res.send(req.user);
  });

  app.get('/logout', function(req, res){
    req.logOut();
    res.render('index.html');
  });

  var auth = function(req, res, next){
    if (!req.isAuthenticated())
      res.send(401);
    else
      next();
  };
};
