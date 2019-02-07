const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all_active = () => database('foods')
  .where('active', true)
  .select()

const find_by_id = (id) => database('foods')
  .where('id', id)
  .select()

const create = (food_data) => database('foods')
  .insert(food_data, 'id')

const update = (id, food_data) => database('foods')
  .where('id', id)
  .update(food_data)

const destroy = (id) => database('foods')
  .where('id', id)
  .del()

  module.exports = {
    all_active, find_by_id, create, update, destroy
  }
