const nodemailer = require("nodemailer");

module.exports.emailVerify = async (options, token, req) =>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "ahmed.saied.1597@gmail.com",
            pass:"auqgmozvvgmldiwo"
        },
    });



    transporter.sendMail(
        {
            
         from: '"Tell Me" <ahmed.saied.1597@gmail.com>' ,
         to: options ,
         subject: "Account Activation" ,
         html: 
         `<div style="padding:30px; background:#bbf; color:#fff;text-align: center"> 
         <a style="padding: 30px; background:#2eff00; color: white; font-weight: 700;" href="${req.protocol}://${req.headers.host}/users/verfiyEmail/${token}"> Verfiy Email</a>
          </div>
         `
        },
        (err, info) => {
            if(err){
                console.log(err);
            }else{
                console.log("${req.protocol}://${req.headers.host}/verfiyEmail/${token}")
                console.log(info)
            }
        }
    )
}