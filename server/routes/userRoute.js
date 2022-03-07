const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/userController');

// route
router.post('/signup', controllers.signup);
router.delete('/signout', checkToken, controllers.signout);
router.post('/login', controllers.login);
router.post('/logout', checkToken, controllers.logout);
router.get('/data', checkToken, controllers.getData);
router.patch('/data', checkToken, controllers.updateData);
router.post('/password', checkToken, controllers.checkPassword);
router.post('/nickname', controllers.checkNickname);
router.post('/email', controllers.checkEmail);


module.exports = router;