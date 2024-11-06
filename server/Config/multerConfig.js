const multer = require('multer');
const profileStorage = require('./cloudinary');

const uploadProfileInstance = multer({storage:profileStorage});

module.exports = uploadProfileInstance;