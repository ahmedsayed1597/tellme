const mongoose = require('mongoose')
const upload = '/uploads';
const path = require('path');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age:Number,
    emailConfirm: {
        type: Boolean,
        default: false,
    },
    pic_url:{
        type:String,
        default: ''
    }
});

var dir =path.dirname(upload);
userSchema.post('init', function(user) {
    user.pic_url = dir + user.pic_url;
    console.log(user.pic_url)

  });

module.exports = mongoose.model('user' , userSchema)