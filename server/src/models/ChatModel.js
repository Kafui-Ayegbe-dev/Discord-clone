const mysql = require('mysql');

function createDbAndTables(){
    // Create a connection to the database server
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789'
    });
  
    // Connect to the server
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database server: ' + err.stack);
        return;
      }
  
      console.log('Connected to the database server.');
  
      // Create the chat_app database if it doesn't exist
      connection.query('CREATE DATABASE IF NOT EXISTS chat_app', (err, result) => {
        if (err) {
          console.error('Error creating the database: ' + err.stack);
          return;
        }
  
        console.log('Database created successfully.');
  
  
  
        // Create the users table within the chat_app database
        connection.query(`CREATE TABLE IF NOT EXISTS chat_app.users (
          id INT NOT NULL AUTO_INCREMENT,
          email VARCHAR(255) NOT NULL UNIQUE,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          is_admin BOOLEAN NOT NULL DEFAULT false,
          PRIMARY KEY (id)
        )`, (err, result) => {
          if (err) {
            console.error('Error creating the users table: ' + err.stack);
            return;
          }
  
          console.log('Table created successfully.');
  
          // Close the connection to the database server
          // connection.end((err) => {
          //   if (err) {
          //     console.error('Error closing the database connection: ' + err.stack);
          //     return;
          //   }
  
          //   console.log('Connection closed successfully.');
          // });
        });
      });
    });
  
  }