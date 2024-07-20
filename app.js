//Start Express App
const express = require('express');
const app = express();
const PORT = 5000;
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.set('view engine', 'ejs');
// const edge = require('edge-js');

//For deletion we need to define our own method
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/BlogWebsite',
    }),
}));

//File Uploader
const expressFileUpload = require('express-fileupload');

//Import the Controllers
const {showHomePage , createPost , storePost , showPost, deletePost} = require('./controllers/PostController');
const {createUser , storeUser, showLoginPage, loginUser, logoutUser} = require('./controllers/UserController');

//Import Middleware
const authenicateUser = require('./middlewares/auth');
const redirectifAuthenticated  = require('./middlewares/redirectifAuthenticated');

const User = require('./models/User');
// app.use('*', async (req, res, next) => {
//     const {userId} = req.session;
//     const user = await User.findById(userId);
//     edge.global('user', user);
//     edge.global('userId', req.session.UserId);
//     next();
// });
app.use('*', async (req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        const user = await User.findById(userId);
        res.locals.user = user;
        res.locals.userId = userId;
    } else {
        res.locals.user = null;
        res.locals.userId = null;
    }
    next();
});


//Import the DB
const db = require('./db');

//Import the Front-End
app.use(express.static('public'));

//Handle Data from POST
// app.use(expressFileUpload);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Call Middleware
const engine = require('express-edge'); 
app.use(engine);
app.set('views', `${__dirname}/views`);

// Configure view caching
app.enable('view cache');

//Call the various functions in PostControllers
app.get('/' , showHomePage);
app.get('/posts/new' ,redirectifAuthenticated, createPost);
app.post('/posts/store', storePost);
app.get('/posts/:id', showPost);
app.get('/', deletePost);

//Call the various functions in UserControllers
app.get('/auth/register', createUser);
app.post('/auth/register', storeUser);
app.get('/auth/login', authenicateUser, showLoginPage);
app.post('/auth/login', loginUser);
app.get('/auth/logout', logoutUser);

//Console output of our PORT
app.listen(PORT , () => {
    console.log('Server at port ' + PORT);
}); 