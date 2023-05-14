const mysql = require('mysql');


function createConn() {
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


module.exports = createConn;