const multer = require("multer");
const {uploadcloud} = require('../utils/cloudinary.utils')
const {v4: uuid4} = require("uuid");

module.exports.uploadImg = (fieldName) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
            
          },

          filename: async function async(req, file, cb) {
            // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            let path = uuid4() + '-' + file.originalname
            cb(null,path)
            //await uploadcloud(path, 'images')
          }
    });

    function fileFilter(req, file, cb){
        if(file.mimetype.startsWith("image")){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }

    const upload = multer({storage: storage, fileFilter});
    return upload.single(fieldName)
}