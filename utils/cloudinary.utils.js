// const cloudinary = require('cloudinary')


// cloudinary.v2.config({
//     cloud_name: 'dnu5atfbs',
//     api_key: '145879932559458',
//     api_secret: 'hqqzGx7Pr_PvtMeG6q8i9EWTcB0',
// })



// module.exports.uploadcloud = async(file, folder) =>{
 
//     return new Promise(resolve => {
//         cloudinary.v2.uploader.upload(file, (result) =>{
//             resolve({
//                 URL:result.url,
//                 public_id:'uploads'
//             })
//         }, {
//             resource_type: "auto",
//             folder:folder
//         }).then(console.log('dfvdbfbrgbr')) 

//     })
// }