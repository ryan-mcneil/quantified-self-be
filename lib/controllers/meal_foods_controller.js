const MealFood = require('../models/meal_food')
const Meal = require('../models/meal')

const pry = require('pryjs')

const index = (request, response) => {
  Meal.foods_by_meal_id(request.params.meal_id)
    .then((meal_data) => {
      if(meal_data.length) {
        let meals = [];
        meal_data.forEach( data => {
          if ( meals.find( meal => meal.id == data.meal_id)) {
            let existing_meal = meals.find( meal => meal.id == data.meal_id);
            existing_meal.foods.push({
              id: data.food_id,
              name: data.food_name,
              calories: data.food_calories
            })
          } else {
            meals.push({
              id: data.meal_id,
              name: data.meal_name,
              date: data.meal_date,
              calorie_goal: data.meal_goal,
              foods: [{
                id: data.food_id,
                name: data.food_name,
                calories: data.food_calories
              }]
            })
          }
        })
        response.status(200).json(meals[0]);
      } else {
        response.status(404).json({
          error: `Could not find meal with meal_id ${request.params.meal_id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
}

module.exports = {
  index
}
