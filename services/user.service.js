const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {emailVerify} = require('../emails/user.email');


module.exports.signup = async (req, res) => {
    
    const {name, email, password, age, emailConfirm} = req.body;
    const user = await userModel.findOne({email})
    if(user){
        res.json({message : "email already exist"})
    }else{
        let token = jwt.sign({email}, 'ahmed');   

        emailVerify(email, token, req)
        bcrypt.hash(password, 4, async function(err, hash) {
            await userModel.insertMany({name , email, password:hash, age})
            res.json({message : "signup success"})
        });
    }

}

module.exports.addPhoto = async(req, res) =>{
    const userID = req.id;
    if(req.file){
        let user = await userModel.findByIdAndUpdate({_id:userID},{ pic_url:req.file.filename});
        let pic = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`
        let token = jwt.sign({emailConfirm:user.emailConfirm, userid: user._id, name:user.name, age:user.age, user_pic:pic}, 'ahmed');   
        res.json({message: "sucess", token});
    }else{
        res.json({message: "images only"})
    }
}

module.exports.getUserByID = async (req, res) => {
    const userID = req.header('userID');
    console.log(userID)
    let pic = '';
    const user = await userModel.findById({_id:userID})
    if(!user){
        res.json({message : "user doesn't existe"})
    }else{
        console.log({user})
        if(user.pic_url != '/'){
        
              pic = `${req.protocol}://${req.headers.host}/uploads${user.pic_url}`
        }else{
             pic = ''
        }
       
        res.json({user, pic})
    }

}



module.exports.signin = async (req, res) =>{
    let pic = '';
    const {email , password} = req.body;
    let user = await userModel.findOne({ email});
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if(match){

            if(user.pic_url != '/'){
        
                pic = `${req.protocol}://${req.headers.host}/uploads${user.pic_url}`
          }else{
               pic = ''
          }

            let token = jwt.sign({emailConfirm:user.emailConfirm, userid: user._id, name:user.name, age:user.age, user_pic:pic}, 'ahmed');

            if(user.emailConfirm == true){
                res.json({ message: "signin success" , token});
            }else{
                res.json({ message: "verfiy your email first"});
            }
            


        }
        else{
            res.json({ message: "password incorrect"});
        }
    }
    else{
        res.json({ message: "email doesn't exist"});
    }
}


module.exports.changePassword = async (req, res) =>{
        const {password, newPassword} = req.body
        const userID = req.id
    
        let user = await userModel.findById(userID)
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(match){
                bcrypt.hash(newPassword, 4, async function(err, hash) {
                    await userModel.findByIdAndUpdate(userID, {password:hash})
                    res.json({message: "password changed success"})
                });
            }
            else{
                res.json({message: "password not correct"})
            }
        }
        else{
            res.json({ message: "this user doesn't exist"});
        }
               
    }


module.exports.updateAccount = async (req, res) =>{
    const {name, age} = req.body
    const userID = req.id
    
    let user = await userModel.findById(userID)
    if(user){
        await userModel.findByIdAndUpdate(userID, {name:name, age:age})
        let pic = `${req.protocol}://${req.headers.host}/uploads/${user.pic_url}`
        let token = jwt.sign({emailConfirm:user.emailConfirm, userid: user._id, name:user.name, age:user.age, user_pic:pic}, 'ahmed'); 
        res.json({message: "account updated success", token})
    }
    else{
        res.json({ message: "this user doesn't exist"});
    }
           
}

module.exports.emailVerfiy = (req, res) =>{
    const {token} = req.params
    jwt.verify(token, 'ahmed',async (err, decoded)=>{
        if(err){
            res.json(err)
        }else{

            let user = await userModel.findOne({email:decoded.email})
            if(user){
                await userModel.findOneAndUpdate({email:decoded.email}, {emailConfirm:true});
                res.json({meassage: "verfiy email"})
            }else{
                res.json({meassage: "verfiy not email"})
            }
            
        }
    });

}
