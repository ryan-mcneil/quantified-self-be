const Goal = require('../models/goal')

const index = (request, response) => {
  Goal.all()
    .then( goals => {
      response.status(200).json(goals);
    })
    .catch( error => {
      response.status(500).json({ error });
    })
}

const update = (request,response) => {
  const goal_data = request.body.goal;
  const id = request.params.id;

  for (let requiredParameter of ['name', 'calories']) {
    if (!goal_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { goal: { name: <String>, calories: <Integer> } }. You're missing a "${requiredParameter}" property.` });
    }
  }
    Goal.update(id, goal_data)
      .then(goal_id => {
        Goal.find_by_id(goal_id)
          .then(goal => {
            response.status(200).json(goal[0]);
          })
      })
      .catch(error => {
        response.status(400).json({ error });
      })
}

module.exports = {
  index, update
}
