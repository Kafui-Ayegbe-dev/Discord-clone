const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
// routes for user registration and login
const registerRoutes = require('./src/routes/regis_loginRoutes')
const userRoutes = require('./src/routes/userRoutes')
// Routes for channels
const channelMsgsRouter = require('./src/routes/channelMsgsRouter')
// Routes for tex msg
const textMsgsRouter = require('./src/routes/textMsgsRoutes')
// db connection import
const db_conns = require('./src/utils/db_connections')
//  set db & connect
db_conns(); // this leaves an open connection


////////////////////////////////////////////// add routes to system ///////////////////////////////
//login and registration routes
app.use(registerRoutes.registration)
app.use(registerRoutes.login)
// user routes
app.use(userRoutes.getUsernames)
// channel routes
app.use(channelMsgsRouter.channelRouter);
// text msgs routes
app.use(textMsgsRouter.textMsgsRouter);




app.listen(3001, () => {
  console.log('Server running on port 3001');
});
