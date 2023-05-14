const express = require('express');
const app = express();
app.use(express.json());

const { createChannel, getChannelNameById, getChannelMsgs,  getUserMsgs, 
    getMostPostUser, getLeastPostUser, getMessagesBySearchString, getAllChannels, deleteChannel} = require('../controllers/ChannelControllers');

const channelRouter = express.Router()

// create a channel
channelRouter.post("/channel", createChannel);

// get all names and ids of created channels
channelRouter.get("/getAllChannels", getAllChannels);

// get the name of ONE channel by id
channelRouter.get("/channelName/:ch_id",getChannelNameById);

//get all messages of a channel by channel id
channelRouter.get("/channel/:ch_id", getChannelMsgs);

// get all messages by a specific user
channelRouter.get("/channel/find/:userName", getUserMsgs);

//get the username with the most messages
channelRouter.get("/channel/mostPost", getMostPostUser);

//get the username with the least messages
channelRouter.get("/channel/leastPost", getLeastPostUser);

// get all messages with a specific string
channelRouter.get("/channel/searchString", getMessagesBySearchString);

// delete channel and corresponding messages
channelRouter.delete('/channel/:channelID', deleteChannel);

// send message on channel


// EXPORTS !!!!!!!!!!!!!!!!!!!
module.exports = {channelRouter};