const Meal = require('../models/meal')
const pry = require('pryjs')

const index = (request, response) => {
  Meal.all()
    .then((meals_data) => {
      let meals = [];
      meals_data.forEach( data => {
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
      response.status(200).json(meals);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
}

const create = (request, response) => {
  const meal_data = request.body.meal;
  const meal_name = request.body.meal.name;
  const meal_date = request.body.meal.date;

  for (let requiredParameter of ['name', 'date']) {
    if (!meal_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { meal: { name: <String>, date: <Date> } }. You're missing a "${requiredParameter}" property.` });
    }
  }
  Meal.find_by_meal_and_date(meal_name, meal_date)
    .then( meals => {
      if (meals.length) {
        return response
          .status(422)
          .send({ error: `Meal already exists for that Date.` });
      } else {
        database('goals')
        .where({name: meal_name})
        .select()
        .then( goals => {
          let calorie_goal = goals[0].calories;
          Meal.create(meal_name, meal_date, calorie_goal)
            .then(meal_ids => {
              Meal.find_by_id(meal_ids[0])
                .then(meal => {
                  response.status(201).json(meal[0]);
                })
            })
            .catch( error => {
              response.status(500).json({ error });
            })
        })
        .catch( error => {
          response.status(500).json({ error });
        })
      }
    })
    .catch( error => {
      eval(pry.it)
      response.status(500).json({ error });
    })
}

module.exports = {
  index, create
}
