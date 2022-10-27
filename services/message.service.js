const messageModel = require('../models/message.model')

module.exports.addMessage = async (req, res) =>{
    const userID = req.query.id
    console.log(userID)
    const {message} = req.body;
    await messageModel.insertMany({message , userID});
    res.json({message: "Message added Successfully"})
}

module.exports.getMessage = async (req, res) =>{
    const userID = req.id;
    console.log(userID)
    let messages = await messageModel.find({userID:userID}, {message:1, favourite:1, createdAt:1});
    res.json({message: "success" , messages})
}

module.exports.getFavouriteMessage = async (req, res) =>{
    const userID = req.id;
    let messages = await messageModel.find({userID:userID,favourite:true}, {message:1, favourite:1, createdAt:1});
    res.json({message: "success" , messages})
}

module.exports.updateMessageStatus = async (req, res) =>{
    const {messageID, favourite} = req.body
     await messageModel.findByIdAndUpdate({_id:messageID}, {favourite});
    res.json({message: "updated success"})
}