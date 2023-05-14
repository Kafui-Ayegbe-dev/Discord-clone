
const mysql = require('mysql');

// function to initialize the user_login database
function initChatAppDb() {
  // create a connection to the database server
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
  });

  // connect to the database server
  connection.connect((err) => {
    if (err) throw err;

    console.log('Connected to the database server.');

    // create the database for user login if it doesn't exist
    connection.query('CREATE DATABASE IF NOT EXISTS chat_app_test_one', (err, result) => {
      if (err) throw err;

      console.log('Database chat_app created or already exists.');

      // use the chat_app database
      connection.query('USE chat_app', (err, result) => {
        if (err) throw err;

        console.log('Database changed to chat_app.');

        // create the users table if it doesn't exist
        connection.query(
          'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), is_admin BOOLEAN DEFAULT false)',
          (err, result) => {
            if (err) throw err;

            console.log('Table users created or already exists.');

            // close the connection to the database server
            connection.end((err) => {
              if (err) throw err;

              console.log('Connection closed to the database server.');
            });
          }
        );
      });
    });
  });
}

module.exports = { initChatAppDb };

