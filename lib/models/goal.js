const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('goals')
  .select()

const find_by_name = (name) => database('goals')
  .where({name: name})
  .select()

module.exports = {
  all, find_by_name
}
