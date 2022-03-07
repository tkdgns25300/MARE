const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/userController');

/*
 ----------------- TEMPLATE -----------------
router.get('/', controllers.get);
router.get('/:id', controllers.getId);
router.post('/', controllers.post);
router.patch('/', controllers.patch);
router.delete('/', controllers.delete);
*/
router.post('/signup', controllers.signup);
router.delete('/signout', controllers.signout);
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);
router.get('/info', controllers.getInfo);


module.exports = router;