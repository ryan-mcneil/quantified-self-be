const express = require('express');
const router = express.Router();
const MealFoodsController = require('../../../controllers/meal_foods_controller');

router.get('/:meal_id/foods', MealFoodsController.index);

module.exports = router
