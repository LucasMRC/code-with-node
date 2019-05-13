// Require dependencies ====================================

require("dotenv").config();

const createError = require("http-errors"),
          express = require("express"),
           engine = require("ejs-mate"),
             path = require("path"),
     cookieParser = require("cookie-parser"),
           logger = require("morgan"),
         passport = require("passport"),
             User = require("./models/user"),
          session = require("express-session"),
   methodOverride = require("method-override"),
         mongoose = require("mongoose"),
        seedPosts = require('./seeds');

// seedPosts();

// Require Routes ==========================================

const indexRouter = require('./routes/index'),
      postsRouter = require('./routes/posts'),
    reviewsRouter = require('./routes/reviews');

const app = express();

// Connect with the database ===============================

mongoose.connect('mongodb://localhost:27017/surf-shop', {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database!');
});
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// view engine setup =======================================

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Configure Passport and Sessions =========================

app.use(
  session({
    secret: 'hang tem dude!',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local Variables Middleware ==============================

app.use(function(req, res, next){
  // set default page title
  req.user = { 
    // '_id': '5cb76bff9d0494008acb5c00', 'username': 'lucas'
    '_id': '5cba4f4e68b7f2006d8928e5', 'username': 'lucas2'
  };
  res.locals.currentUser = req.user;
  res.locals.title   = 'Surf Shop';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue on to the next function in middleware chain
  next();
});

// Mount Routes ============================================

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler ==================

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler ===========================================

app.use(function (err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;
