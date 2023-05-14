const mysql = require('mysql');

///////////////////////////////////////////////////////////
function createUser(firstName, lastName, email, password) {
  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'chat_app'
  });

  const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  const values = [firstName, lastName, email, password];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error inserting user:', error);
      return;
    }

    console.log('User inserted successfully!');
  });

  connection.end();
}

////////////////////////////////////////////////////////////
// test function
exports.fuckCyril = () => {
  console.log('test is working')
}

// function to create a connection to the database
function createConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
  });

  // returns the connection
  return connection;
}


const table1 = `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false
)`;

const table2 = `CREATE TABLE channels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT
)`;

const table3 = `CREATE TABLE channel_members (
  channel_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (channel_id, user_id)
)`;

const table4 = `CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  channel_id INT NOT NULL,
  like_count INT NOT NULL DEFAULT 0,
  dislike_count INT NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
)`;


// Query needed for entire db schema
const createSchemaQuery = `
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
  );
  
  CREATE TABLE channels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
  );

  CREATE TABLE channel_members (
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (channel_id, user_id)
  );
  
  CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    like_count INT NOT NULL DEFAULT 0,
    dislike_count INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
  );
`;


// function to init/create database
function initChatAppDb() {
  // create a connection to the database server
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    }
    console.log('Connected to database server');

    // Check if database already exists
    connection.query('SHOW DATABASES', (err, results) => {
      if (err) {
        console.error('Error checking if database exists:', err);
      }
      const dbExists = results.some((row) => row.Database === connection.config.database);
      console.log(`Database ${connection.config.database} exists: ${dbExists}`);
      
      // Create database if it doesn't exist
      if (!dbExists) {
        connection.query('CREATE DATABASE chat_app', (err) => {
          if (err) {
            console.error('Error creating database:', err);
            connection.end();
            return;
          }
          console.log('Database created');

          // create the table 1
          connection.query(table1,(err, result) => {
            if (err) {
              console.error('Error creating user table:', err);
              connection.end();
              return;
            }
            console.log('User Table created');

            // create the table 2
            connection.query(table2,(err, result) => {
              if (err) {
                console.error('Error creating channels table:', err);
                connection.end();
                return;
              }
              console.log('Channels Table created');

              // create the table 3
              connection.query(table3,(err, result) => {
                if (err) {
                  console.error('Error creating channel members table:', err);
                  connection.end();
                  return;
                }
                console.log('Channel Members Table created');

                // create the table 4
                connection.query(table4,(err, result) => {
                  if (err) {
                    console.error('Error creating messages table:', err);
                    connection.end();
                    return;
                  }
                  console.log('Messages Table created');
                  console.log('All tables created.');

                  // close the connection to the database server
                  connection.end((err) => {
                    if (err) throw err;
                    console.log('Connection closed to the database server.');
                  });
                });
              });
            });
          });
        });
      } else {
        // If database exists, close the connection to the database server
        connection.end((err) => {
          if (err) throw err;
          console.log('Connection closed to the database server.');
        });
      }
    });
  });
}






// module.exports = {
//   createConnection,
//   closeConnection,
//   initChatAppDb
// };




// const { createConnection, closeConnection } = require('./utils');

// const connection = createConnection();

// // do database operations here

// closeConnection(connection);