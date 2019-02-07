const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('goals')
  .select()

const find_by_name = (name) => database('goals')
  .where({name: name})
  .select()

const update = (id, goal_data) => database('goals')
  .where({id: id})
  .update(goal_data)

const find_by_id = (id) => database('goals')
  .where({id: id})
  .select()

module.exports = {
  all, find_by_name, update, find_by_id
}
