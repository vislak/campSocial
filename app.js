var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds');
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var methodOverride = require('method-override');
var flash = require('connect-flash');

// requiring routes
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes		= require('./routes/index');

mongoose.connect("mongodb+srv://aadhar:NBhKqjWVJ1zn4Ajq@cluster0-uwdpi.mongodb.net/yelp?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

app.use(require('express-session')({
	secret : 'Bootcamp project - YelpCamp',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// express routers use & can provide prefix for every single route
app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);


// app.listen('3000', 'localhost', function() {
// 	console.log('YelpCamp Server is running on localhost 3000 port');
// });

app.listen( process.env.PORT, process.env.IP, function() {
	console.log('YelpCamp Server started....');
});



