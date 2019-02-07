const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('meals')
  .leftJoin('meal_foods', 'meal_foods.meal_id', '=', 'meals.id')
  .leftJoin('foods', 'meal_foods.food_id', '=', 'foods.id')
  .select( 'meals.id AS meal_id', 'meals.name AS meal_name', 'meals.date AS meal_date', 'meals.calorie_goal AS meal_goal', 'foods.id AS food_id', 'foods.name AS food_name', 'foods.calories AS food_calories')

const find_by_meal_and_date = (name, date) => database('meals')
  .where({name: name, date: date})
  .select()

const find_by_id = (id) => database('meals')
  .where({id: id})
  .select()

const create = (name, date, calorie_goal) => database('meals')
  .insert({name: name, date: date, calorie_goal: calorie_goal}, 'id')

module.exports = {
  all, create, find_by_id, find_by_meal_and_date
}
