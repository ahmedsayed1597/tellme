const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    message: String,
    userID: mongoose.SchemaTypes.ObjectId,
    favourite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
});

module.exports = mongoose
.model('message' , messageSchema)