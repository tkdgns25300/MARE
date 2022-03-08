const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/recipeController');


// route
router.post('/content', checkToken, controllers.uploadRecipe);
router.get('/content', checkToken, controllers.getRecipe);
router.delete('/content', checkToken, controllers.deleteRecipe);
router.patch('/content', checkToken, controllers.modifyRecipe);
router.post('/bookmark', controllers.bookmarkRecipe);


module.exports = router;