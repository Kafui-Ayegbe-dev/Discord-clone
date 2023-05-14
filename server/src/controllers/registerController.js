const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());




// user registration logic
exports.user_registration = async (req,res) => {

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  
  conn.query('INSERT INTO users (email, username, password ) VALUES (?, ?, ?)',
  [email, username, password],
  (err, result) => {
    console.log(err);
  })

  conn.end();
  console.log("Registration successful")

}

// user login logic
exports.user_login = (req, res) => {

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  const username = req.body.username;
  const password = req.body.password;

  conn.query("SELECT * FROM users WHERE username = ? AND password = ?",[username, password], (err, results) => {
    if (err) throw err;

    if (results.length === 1) {
      res.json({ success: true, message: 'Login successful' ,username:username});
      console.log("Welcome "+username)
    } 
    else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
  conn.end();
  
};

// module.exports