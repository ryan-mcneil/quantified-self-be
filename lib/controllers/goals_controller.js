const Goal = require('../models/goal')
const pry = require('pryjs')

const index = (request, response) => {
  Goal.all()
    .then( goals => {
      response.status(200).json(goals);
    })
    .catch( error => {
      response.status(500).json({ error });
    })
}


module.exports = {
  index
}
