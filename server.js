const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const bodyParser = require('body-parser');
const helmet = require('helmet')

var authConfig = false;
try{
  authConfig = require('./config/auth.json');
}
catch(e){
  console.log("The real auth config is not commited to the repo for security reasons")
}

// securing the app
app.use(helmet())

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FacebookTokenStrategy({
    clientID: authConfig ? authConfig.clientID : '123123',
    clientSecret: authConfig ? authConfig.clientSecret : 'abcabc123123'
  }, function(accessToken, refreshToken, profile, done) {
    done(null,{id:1});
  }
));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json() );

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'))
app.use('/static', express.static('static'))

require('./routes.js')(app, passport);

server.listen(5000);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('character click', function (data) {
    console.log('Character Clicked:',data);
  });
});
