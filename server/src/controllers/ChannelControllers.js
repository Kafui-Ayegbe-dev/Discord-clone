const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

// channels have id, name, description
// channel messages are stored in a different table
// that can be queried like this ---> SELECT message, timestamp FROM messages WHERE channel_id = {channel_id};


// create a channel
exports.createChannel = async (req,res) => {

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });


  const channelName = req.body.name;
  
  conn.query('INSERT INTO channels (name) VALUES (?)',
  [channelName], (err, result) => {
    console.log(err);
  })

  conn.end();
  console.log("Channel created")

}


// get ONE channel name by id
exports.getChannelNameById = (req, res) => {

  const channelId = req.params.ch_id;

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });

  const query = 'SELECT name FROM channels WHERE id = ?';
  
  conn.query(query, [channelId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error getting channel name from database');
    } else {
      if (result.length > 0) {
        res.send(result[0].name);
      } else {
        res.status(404).send('Channel not found');
      }
    }
  });

  conn.end();
}





// get ID and NAMES of all channels
exports.getAllChannels = async (req,res) => {

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'chat_app'
  });


  const query = `SELECT id, name FROM channels`;
  
  conn.query(query, (err, result) => {
      if (err){
          throw err;
      } 
      else {
        res.status(200).json(result);
      }
  })

  conn.end();

}



// get all messages in the channel
exports.getChannelMsgs = async (req,res) => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });
  
    const channel_id = req.params.ch_id;

    // const query = `
    //     SELECT message, created_at
    //     FROM channels
    //     c JOIN channel_msgs m ON c.id = m.channel_id
    //     WHERE c.name = ?
    // `;

    const query = `SELECT * FROM channel_msgs WHERE id = ?`;
    
    conn.query(query, [channel_id], (err, result) => {
        if (err){
            throw err;
        } 
        else {
          res.status(200).json(result);
        }
    })
  
    conn.end();
  
}
  

// get all msgs by a specific user
exports.getUserMsgs = async (req,res) => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });
  
    const username = req.body.username;

    const query = `SELECT * 
        FROM channel_msgs 
        WHERE user_id = (SELECT id FROM users WHERE username = ?)`;
    
    conn.query(query, [username], (err, result) => {
        if (err){
            throw err;
        } 
        else {
          res.status(200).json(result);
        }
    })
  
    conn.end();
  
}



// Returns the username with the most messages
exports.getMostPostUser = async (req,res) => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });
  
    // const username = req.body.username;

    const query = `SELECT users.username, COUNT(*) as msg_count
        FROM users 
        INNER JOIN channel_msgs ON users.id = channel_msgs.user_id 
        GROUP BY users.id 
        ORDER BY msg_count DESC 
        LIMIT 1`;
    
    conn.query(query, (err, result) => {
        if (err){
            throw err;
        } 
        else {
            // I feel Like I shouldn't be returning it this way 
          res.status(200).json(result);
        }
    })
  
    conn.end();
  
}




// returns the username with the least message
exports.getLeastPostUser = async () => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });
  
    const query = `
        SELECT user_id, COUNT(*) AS msg_count
        FROM channel_msgs
        GROUP BY user_id
        ORDER BY msg_count ASC
        LIMIT 1;
    `;

  const [rows] = await conn.query(query);
  conn.end();

  return rows[0];
  
}


// get all messages with a specific string
exports.getMessagesBySearchString = async (searchString) => {

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'chat_app'
    });

    const query = `
      SELECT cm.*, u.username
      FROM channel_msgs cm
      JOIN users u ON cm.user_id = u.id
      WHERE cm.message LIKE '%${searchString}%'
    `;

    
    const [rows] = await conn.query(query);
    conn.end();
    return rows;
  };



  ///////////////////////////////////////////// DELETING STUFF /////////////////////////////////
  exports.deleteChannel = async (req,res) => {

    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'chat_app'
    });

    // get channelid
    const channelID = req.params.channelID;
  
    const deleteMessagesQuery = `DELETE FROM channel_msgs WHERE channel_id = ${channelID}`;

    const deleteChannelQuery = `DELETE FROM channels WHERE id = ${channelID}`;

    conn.query(deleteMessagesQuery, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Deleted ${result.affectedRows} messages for channel ${channelID}`);
  });

  conn.query(deleteChannelQuery, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Deleted channel ${channelID}`);
  });

  conn.end();

}
