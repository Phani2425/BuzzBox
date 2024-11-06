const uploadProfileInstance = require('../Config/multerConfig');
const { LoginController } = require('../Controllers/AuthController/LoginController');
const { SignupController } = require('../Controllers/AuthController/SignupController');
const { FindUniqueUserName } = require('../Controllers/AuthController/UsernameController');

const router = require('express').Router();

//auth routes
router.post('/signup',uploadProfileInstance.single('image'),SignupController);
router.post('/login', LoginController);
router.post('/username', FindUniqueUserName);

module.exports = router;