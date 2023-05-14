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
        msg_count INT NOT NULL DEFAULT 0,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        PRIMARY KEY (id)
        )`, (err, result) => {
        if (err) {
          console.error('Error creating the users table: ' + err.stack);
          return;
        }
        else{
          console.log('Users Table created successfully.');
        }
      });



      // Create the CHANNELS table
      // i might remove the description field
      connection.query(`CREATE TABLE IF NOT EXISTS chat_app.channels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT
        )`, (err, result) => {
        if (err) {
          console.error('Error creating the CHANNELS table: ' + err.stack);
          return;
        }
        else{
          console.log('CHANNELS Table created successfully.');
        }
      });


      // Create CHANNEL_MSGS table to store messages for each channel
      connection.query(`CREATE TABLE IF NOT EXISTS chat_app.channel_msgs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        channel_id INT NOT NULL,
        user_id INT NOT NULL,
        message VARCHAR(255),
        like_count INT NOT NULL DEFAULT 0,
        dislike_count INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL,
        hash CHAR(64) NOT NULL,
        FOREIGN KEY (channel_id) REFERENCES channels(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
        )`, (err, result) => {
        if (err) {
          console.error('Error creating the CHANNEL_MSGS table: ' + err.stack);
          return;
        }
        else{
          console.log('CHANNEL_MSGS Table created successfully.');
        }
      });


    });
  });
  // Close the connection to the database server
        // connection.end((err) => {
        //   if (err) {
        //     console.error('Error closing the database connection: ' + err.stack);
        //     return;
        //   }

        //   console.log('Connection closed successfully.');
        // });
  console.log("All Tables created successfully");
}

module.exports = createDbAndTables;