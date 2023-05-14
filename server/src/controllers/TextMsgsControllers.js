const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
const generateMessageHash = require('../utils/hash');
//const convertToMySQLTimestamp = require('../utils/timeConvert');

// This is the routes for the actual text messages

// create a new text msg/post
exports.createMessage = async (req,res) => {
  // get the ff from the req.body
  const channelId = req.body.channelId
  const message = req.body.message
  const username = req.body.username
  const time = req.body.time


  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  // get userid by querying username
  var user_id = null;

  const sql = `SELECT id FROM users WHERE username = '${username}'`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting user ID' });
    }

    // extract the user id from the result
    user_id = results[0].id;

    // create hash to uniquely identify a message
    const hash_val = generateMessageHash(user_id, channelId, time)

    // Insert message into database
    conn.query(
      'INSERT INTO channel_msgs (channel_id, user_id, message, created_at, hash) VALUES (?, ?, ?, ?, ?)',
      [channelId, user_id, message, time, hash_val],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error inserting message into database' });
        }
        conn.end();
        return res.status(200).json(result);
      }
    );
  });
};


exports.deleteMsg = async (req,res) => {
  // get the ff from the req.body
  const channelId = req.body.channelId
  const uname = req.body.username
  const time = req.body.time



  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  // get userid by querying username
  var user_id = null;

  const sql = `SELECT id FROM users WHERE username = '${uname}'`;
  conn.query(sql, (error, results) => {
    if (results.length === 0) {
      console.error('No user found with that username');
      return res.status(404).json({ message: 'User not found' });
    }

    // extract the user id from the result
    user_id = results[0].id;

    // find the hash value that uniquely identifies it
    const hash_val = generateMessageHash(user_id, channelId, time);

    // delete message from database
    conn.query('DELETE FROM channel_msgs WHERE hash = ?', [hash_val],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error deleting message into database' });
        }
        conn.end();
        return res.status(200).json(result);
      }
    );
  });
}


// Increase upvote fied by one
exports.upVote = async (req,res) => {
  // get the ff from the req.body
  const channelId = req.body.channelId
  const uname = req.body.username
  const time = req.body.time

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  // get userid by querying username
  var user_id = null;

  const sql = `SELECT id FROM users WHERE username = '${uname}'`;
  conn.query(sql, (error, results) => {
    if (results.length === 0) {
      console.error('No user found with that username');
      return res.status(404).json({ message: 'User not found' });
    }

    // extract the user id from the result
    user_id = results[0].id;

    // find the hash value that uniquely identifies it
    const hash_val = generateMessageHash(user_id, channelId, time);

    // update the vote message from database
    const query = `UPDATE channel_msgs SET like_count = like_count + 1 WHERE hash = ?`;

    conn.query(query, [hash_val], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Upvote value of message ${hash_val} updated successfully.`);
      }
    });

    conn.end();
  });
}

exports.downVote = async (req,res) => {
  // get the ff from the req.body
  const channelId = req.body.channelId
  const uname = req.body.username
  const time = req.body.time

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  // get userid by querying username
  var user_id = null;

  const sql = `SELECT id FROM users WHERE username = '${uname}'`;
  conn.query(sql, (error, results) => {
    if (results.length === 0) {
      console.error('No user found with that username');
      return res.status(404).json({ message: 'User not found' });
    }

    // extract the user id from the result
    user_id = results[0].id;

    // find the hash value that uniquely identifies it
    const hash_val = generateMessageHash(user_id, channelId, time);

    // update the vote message from database
    const query = `UPDATE channel_msgs SET dislike_count = dislike_count + 1 WHERE hash = ?`;

    conn.query(query, [hash_val], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Downvote value of message ${hash_val} updated successfully.`);
      }
    });

    conn.end();
  });
}


