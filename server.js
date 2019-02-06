const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self';

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin",
    "*");
  response.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

// ----------Foods---------

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select()
    .then((foods) => {
      if(foods.length) {
        response.status(200).json(foods[0]);
      } else {
        response.status(404).json({
          error: `Could not find food with id ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/foods', (request, response) => {
  const food_data = request.body.food;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { food: { name: <String>, calories: <Integer> } }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').insert(food_data, 'id')
    .then(food_id => {
      database('foods').where({id: food_id[0]}).select()
        .then(food => {
          response.status(201).json(food[0]);
        })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.put('/api/v1/foods/:id', (request, response) => {
  const food_data = request.body.food;
  let id = request.params.id;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { food: { name: <String>, calories: <Integer> } }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').where({id: id}).update(food_data)
    .then(food_id => {
      database('foods').where({id: food_id}).select()
        .then(food => {
          response.status(200).json(food[0]);
        })
    })
    .catch(error => {
      response.status(400).json({ error });
    })
})

app.delete('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).del()
    .then((foods) => {
      if(foods) {
        response.status(204).json();
      } else {
        response.status(404).json({
          error: `Could not find food with id ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// -------Meals-------

app.get('/api/v1/meals', (request, response) => {
  database('meals')
  .join('meal_foods', 'meal_foods.meal_id', '=', 'meals.id')
  .join('foods', 'meal_foods.food_id', '=', 'foods.id')
  .select( 'meals.id AS meal_id', 'meals.name AS meal_name', 'meals.date AS meal_date', 'meals.calorie_goal AS meal_goal', 'foods.id AS food_id', 'foods.name AS food_name', 'foods.calories AS food_calories')
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
});

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  database('meals')
  .join('meal_foods', 'meal_foods.meal_id', '=', 'meals.id')
  .join('foods', 'meal_foods.food_id', '=', 'foods.id')
  .where('meal_foods.meal_id', request.params.meal_id)
  .select( 'meals.id AS meal_id', 'meals.name AS meal_name', 'meals.date AS meal_date', 'meals.calorie_goal AS meal_goal', 'foods.id AS food_id', 'foods.name AS food_name', 'foods.calories AS food_calories')
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
})

app.post('/api/v1/meals', (request, response) => {
  const meal_data = request.body.meal;

  // const meal_name = request.body.meal.name;

  for (let requiredParameter of ['name', 'date']) {
    if (!meal_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { meal: { name: <String>, date: <Date> } }. You're missing a "${requiredParameter}" property.` });
    }
  }
  // hard code calorie_goal until Goals table is created
  const calorie_goal = 400;
  meal_data.calorie_goal = calorie_goal;

  database('meals').insert(meal_data, 'id')
    .then(meal_id => {
      database('meals').where({id: meal_id[0]}).select()
        .then(meal => {
          response.status(201).json(meal[0]);
        })
    })
    .catch( error => {
      response.status(500).json({ error });
    })
})

app.post('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {
  let meal_id = request.params.meal_id;
  let food_id = request.params.food_id;
  let meal_name;
  let food_name;

  database('meal_foods').insert({meal_id: meal_id, food_id: food_id}, 'id')
  .then( id => {
    database('meals').where({id: meal_id}).select()
      .then( meals => {
          meal_name = meals[0].name;
          database('foods').where({id: food_id}).select()
            .then( foods => {
                food_name = foods[0].name;
                response.status(201).json({ message: `Successfully added ${food_name} to ${meal_name}`})
            })
      })
  })
  .catch( error => {
    response.status(404).json({ error });
  })
})

app.delete('/api/v1/meals/:meal_id/foods/:food_id', (request,response) => {
  let meal_id = request.params.meal_id;
  let food_id = request.params.food_id;
  let meal_name;
  let food_name;

  database('meal_foods')
  .where({meal_id: meal_id, food_id: food_id})
  .del()
  .then( id => {
    if (id) {
      database('meals').where({id: meal_id}).select()
      .then( meals => {
        meal_name = meals[0].name;
        database('foods').where({id: food_id}).select()
        .then( foods => {
          food_name = foods[0].name;
          response.status(201).json({ message: `Successfully removed ${food_name} from ${meal_name}`})
        })
      })
    } else {
      return response
        .status(404)
        .send({ error: `Could not find meal_food with those parameters` });
    }
  })
  .catch( error => {
    response.status(500).json({ error });
  })
})

module.exports = app
