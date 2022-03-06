const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/userController');

// route
router.post('/signup', controllers.signup);
router.delete('/signout', controllers.signout);
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);
router.get('/data', controllers.getData);
router.patch('/data', controllers.updateData);
router.post('/password', controllers.checkPassword);
router.post('/nickname', controllers.checkNickname);
router.post('/email', controllers.checkEmail);


module.exports = router;