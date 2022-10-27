const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) =>{
    const token = req.header('token');
    const userID = req.header('userID');
    req.id = userID
    jwt.verify(token, 'ahmed',  function(err, decoded) {

        if(err){
            res.json({message: 'error in token or token not provided' , err})
        }else{
            req.id = decoded.userid
            next();
        }
    })

}