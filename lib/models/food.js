const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('foods')
  .where({active: true})
  .select()

const select = (id) => database('foods')
  .where('id', id)
  .select()

  module.exports = {
    all, select
  }
