

const {addMessage, getMessage, updateMessageStatus, getFavouriteMessage} = require('../services/message.service')
const {auth} = require('../middleware/authentication/auth')

const app = require("express").Router();

app.post('/addMessage' , addMessage);
app.get('/getMessage' ,auth, getMessage);
app.get('/getFavouriteMessage' ,auth, getFavouriteMessage);
app.patch('/updateStatus', auth, updateMessageStatus);

module.exports = app