// Name: Cyril Ayegbe
// NSID: cma595
// Student Number: 11279069
// Instructor: Ralph Deters
// Course: CMPT 353
// Course Section Number: CMPT-353-02

const express = require('express');
const app = express();
app.use(express.json());

const { user_registration, user_login  } = require('../controllers/registerController.js');
const login = express.Router();
const registration = express.Router();

// 
registration.post('/register', user_registration);

login.post('/login', user_login);
  
module.exports = {login, registration};