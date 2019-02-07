const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const foods = require('./lib/routes/api/v1/foods')
const meals = require('./lib/routes/api/v1/meals')
const goals = require('./lib/routes/api/v1/goals')

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

// -------Foods-------

app.use('/api/v1/foods', foods)
app.use('/api/v1/foods/:id', foods)

// -------Meals-------

app.use('/api/v1/meals', meals)

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  database('meals')
  .leftJoin('meal_foods', 'meal_foods.meal_id', '=', 'meals.id')
  .leftJoin('foods', 'meal_foods.food_id', '=', 'foods.id')
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

// app.post('/api/v1/meals', (request, response) => {
//   const meal_data = request.body.meal;
//   const meal_name = request.body.meal.name;
//   const meal_date = request.body.meal.date;
//
//   for (let requiredParameter of ['name', 'date']) {
//     if (!meal_data[requiredParameter]) {
//       return response
//         .status(422)
//         .send({ error: `Expected format: { meal: { name: <String>, date: <Date> } }. You're missing a "${requiredParameter}" property.` });
//     }
//   }
//   database('meals')
//     .where({name: meal_name, date: meal_date})
//     .select()
//     .then( meals => {
//       if (meals.length) {
//         return response
//           .status(422)
//           .send({ error: `Meal already exists for that Date.` });
//       } else {
//         database('goals')
//         .where({name: meal_name})
//         .select()
//         .then( goals => {
//           let calorie_goal = goals[0].calories;
//           database('meals').insert({name: meal_name, date: meal_date, calorie_goal: calorie_goal}, 'id')
//           .then(meal_id => {
//             database('meals').where({id: meal_id[0]}).select()
//             .then(meal => {
//               response.status(201).json(meal[0]);
//             })
//           })
//           .catch( error => {
//             response.status(500).json({ error });
//           })
//         })
//         .catch( error => {
//           response.status(500).json({ error });
//         })
//       }
//     })
//     .catch( error => {
//       response.status(500).json({ error });
//     })
// })

app.post('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {
  let meal_id = request.params.meal_id;
  let food_id = request.params.food_id;

  database('meal_foods').insert({meal_id: meal_id, food_id: food_id}, 'id')
  .then( id => {
    database('meals').where({id: meal_id}).select()
      .then( meals => {
          let meal_name = meals[0].name;
          database('foods').where({id: food_id}).select()
            .then( foods => {
                let food_name = foods[0].name;
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

  database('meal_foods')
  .where({meal_id: meal_id, food_id: food_id})
  .del()
  .then( id => {
    if (id) {
      database('meals').where({id: meal_id}).select()
      .then( meals => {
        let meal_name = meals[0].name;
        database('foods').where({id: food_id}).select()
        .then( foods => {
          let food_name = foods[0].name;
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

// -------Goals-------

app.use('/api/v1/goals', goals)


// app.get('/api/v1/goals', (request,response) => {
//   database('goals').select()
//   .then( goals => {
//     response.status(200).json(goals);
//   })
//   .catch( error => {
//     response.status(500).json({ error });
//   })
// })

app.put('/api/v1/goals/:id', (request, response) => {
  const goal_data = request.body.goal;
  let id = request.params.id;

  for (let requiredParameter of ['name', 'calories']) {
    if (!goal_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { goal: { name: <String>, calories: <Integer> } }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('goals').where({id: id}).update(goal_data)
    .then(goal_id => {
      database('goals').where({id: goal_id}).select()
        .then(goal => {
          response.status(200).json(goal[0]);
        })
    })
    .catch(error => {
      response.status(400).json({ error });
    })
})

module.exports = app
