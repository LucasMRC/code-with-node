// Require dependencies ====================================================================

/* eslint-disable */
const createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  passport = require("passport"),
  User = require("./models/user"),
  session = require("express-session"),
  mongoose = require("mongoose");

/* eslint-enable */

// Require Routes ===========================================================================

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');

const app = express();

// Connect with the database ================================================================

mongoose.connect('mongodb://localhost:27017/surf-shop', {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database!');
});

// view engine setup ========================================================================

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Passport and Sessions ==========================================================

app.use(
  session({
    secret: 'hang tem dude!',
    resave: false,
    saveUninitialized: true
  })
);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount Routes =============================================================================

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler ===================================================

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler ============================================================================

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
