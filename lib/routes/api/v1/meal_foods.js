const express = require('express');
const router = express.Router();
const MealFoodsController = require('../../../controllers/meal_foods_controller');

router.get('/:meal_id/foods', MealFoodsController.index);
router.post('/:meal_id/foods/:food_id', MealFoodsController.create);
router.delete('/:meal_id/foods/:food_id', MealFoodsController.destroy);

module.exports = router
