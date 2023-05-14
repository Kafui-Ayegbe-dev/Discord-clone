const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());



// get all registerd users
exports.getAllUserNames = async (req,res) => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });

    conn.query('SELECT id, username FROM users', (error, results) => {
        if (error) throw error;
        res.send(results);
    });

    conn.end();
    console.log("Gotten all usernames from database")
  
  }


  //////////////////////////////////////////// DELETE //////////////////////////////////////

  // deletes a user and their corresponding posts
  exports.deleteUser = async (req,res) => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });

    // get channelid
    const userId = req.params.userId;
  
    const deleteMessagesQuery = `DELETE FROM channel_msgs WHERE user_id = ${userId}`;

    const deleteUserQuery = `DELETE FROM users WHERE id = ${userId}`;

    conn.query(deleteMessagesQuery, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Deleted ${result.affectedRows} messages for user ${userId}`);
  });

  conn.query(deleteUserQuery, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Deleted user ${userId}`);
  });
  console.log("User " + userId+ " deleted")

  conn.end();

}
