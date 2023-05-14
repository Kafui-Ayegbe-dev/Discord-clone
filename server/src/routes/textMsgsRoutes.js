const express = require('express');
const app = express();
app.use(express.json());

const {createMessage, deleteMsg, downVote, upVote} = require('../controllers/TextMsgsControllers.js')

// This is the routes for the actual text messages
const textMsgsRouter = express.Router()

// send a new text
textMsgsRouter.post('/newmsg', createMessage)

// delete a text message
textMsgsRouter.delete('/deletemsg', deleteMsg)

// upvote a message
textMsgsRouter.patch('/upvote', upVote)

// downvote a message
textMsgsRouter.patch('/downvote', downVote)

// EXPORTS !!!!!!!!!!!!!!!!!!!
module.exports = {textMsgsRouter};