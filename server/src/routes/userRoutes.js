// Name: Cyril Ayegbe
// NSID: cma595
// Student Number: 11279069
// Instructor: Ralph Deters
// Course: CMPT 353
// Course Section Number: CMPT-353-02

const express = require('express');
const app = express();
app.use(express.json());

const { getAllUserNames, deleteUser  } = require('../controllers/userControllers.js');
const getUsernames = express.Router();

// 
getUsernames.get('/users', getAllUserNames);
getUsernames.delete('/users/:userId', deleteUser)
 
module.exports = {getUsernames};