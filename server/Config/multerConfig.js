const multer = require('multer');
const {profileStorage} = require('./cloudinary');

//this was the multer instance used to upload profile images directly to the cludinary
const uploadProfileInstance = multer({storage:profileStorage});

//here it is the multer instance which will be used to upload attachments as the buffer in memory [default behaviour of multer] and then those attachments will be uploaded to  the cloudinary manually in the controller
const uploadAttachments = multer({limits
    : {
        //filesize takes bytes as input
        fileSize:10*1024*1024
    }
})

module.exports = {uploadProfileInstance,uploadAttachments};