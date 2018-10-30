// internally node will run this start file wrapped with an Inmediate Function Invocation
// and will pass parameters like: 
// - exports
// - module
// - require
// - console
// - __dirname: it's the dir name where this file is. Useful when we need to send files

/* eslint no-unused-vars: 0 */
if (process.env.NODE_ENV !== 'production') {
  require('./node_modules/dotenv').config();
}

  const db = require('./src/db/db.js');
  db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
  });
  
const express  = require('express'), 
  bodyParser   = require('body-parser'),
  cors         = require('cors'),
  logger       = require('morgan'),
  jwt          = require('./src/middlewares/jwt'),
  errorHandler = require('./src/middlewares/errorHandler'),
  loginRouter  = require('./src/controllers/login'),
  userRouter   = require('./src/controllers/users');
const app = express();
/* app is an object provided by Express API for the developer to communicate
  with the application and bootstrap a server. In Express application,
  it is that easy to write bare minimum server. */

app.use(logger('dev - '));

app.use(bodyParser.urlencoded({ extended: false }));
/* 
CORS options:
origin: Configures the Access-Control-Allow-Origin CORS header.
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
DEFAULT
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
*/
app.use(cors());
app.use(bodyParser.json());  //bodyParser - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(jwt()); // our custom middleware

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);

app.use(errorHandler); // global error handler

const port = process.env.PORT || 3301;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;