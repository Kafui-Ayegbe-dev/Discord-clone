const crypto = require('crypto');

function generateMessageHash(userid, channelid, timestamp) {
  // Convert the timestamp to a string in the format 'YYYY-MM-DD HH:MM:SS'
  // const timestampStr = timestamp.toISOString().replace('T', ' ').substr(0, 19);
  
  // Concatenate the userid, channelid, and timestamp strings
  const messageStr = `${userid}|${channelid}|${timestamp}`;
  
  // Hash the message string using the SHA-256 algorithm
  const hash = crypto.createHash('sha256').update(messageStr).digest('hex');
  
  return hash;
}

module.exports = generateMessageHash;