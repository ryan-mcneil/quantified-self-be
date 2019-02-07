const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const foods = require('./lib/routes/api/v1/foods')
const meals = require('./lib/routes/api/v1/meals')
const meal_foods = require('./lib/routes/api/v1/meal_foods')
const goals = require('./lib/routes/api/v1/goals')

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

// -------Meals-------

app.use('/api/v1/meals', meals)

// -------MealFoods-----

app.use('/api/v1/meals', meal_foods)

// -------Goals-------

app.use('/api/v1/goals', goals)

module.exports = app
