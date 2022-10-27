
const {signup, signin, getUserByID, addPhoto, changePassword, updateAccount, emailVerfiy} = require('../services/user.service')
const {uploadImg} = require('../common/uploadImg');
const {auth} = require('../middleware/authentication/auth')
const {userVaildation , signinVaildation} = require('../middleware/authentication/users.vaild')
const app = require("express").Router();

app.post('/signup' , userVaildation, signup);
app.post('/signin' , signinVaildation, signin);
app.get('/verfiyEmail/:token', emailVerfiy);
app.get('/getUserByID', getUserByID);
app.post('/uploadImg', uploadImg('image'), auth,addPhoto);
app.put('/changePassword', auth,changePassword);
app.put('/accountUpdate', auth,updateAccount);

module.exports = app