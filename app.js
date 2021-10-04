const express = require('express');
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '\\src\\public');

const configRoutes = require('./src/routes');
const exphbs = require('express-handlebars');


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname+'\\src\\views')

app.use(session({
  secret: Math.random().toString(36).substring(7),
  resave: false,
  saveUninitialized: true,

}));
app.use(function (req, res, next) {
  app.locals.expreq = req;
  if (req.session.accesslevel > 2) {
    app.locals.admin = true;
  }
  else{
    app.locals.admin = false;
  }
  let authstring=' (Non-Authenticated User)'
  if (req.session.authed){
    authstring=' (Authenticated User)'
  }
  console.log('['+new Date().toTimeString()+']: ' + req.method + ' ' + req.originalUrl + authstring);
  next();
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
configRoutes(app);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("We've now got a server!");
});