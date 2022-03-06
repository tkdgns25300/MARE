const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/recipeController');

// route
router.post('/content', controllers.uploadRecipe);
router.get('/content', controllers.getRecipe);
router.delete('/content', controllers.deleteRecipe);
router.patch('/content', controllers.modifyRecipe);
router.post('/bookmark', controllers.bookmarkRecipe);


module.exports = router;