const Food = require('../models/food')

const index = (request, response) => {
  Food.all_active()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
}

const show = (request, response) => {
  Food.find_by_id(request.params.id)
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
}

const create = (request, response) => {
  const food_data = request.body.food;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { food: { name: <String>, calories: <Integer> } }. You're missing a "${requiredParameter}" property.` });
    }
  }
  Food.create(food_data)
    .then(food_ids => {
      Food.find_by_id(food_ids[0])
        .then(food => {
          response.status(201).json(food[0]);
        })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
}

const update = (request, response) => {
  const food_data = request.body.food;
  let id = request.params.id;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food_data[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { food: { name: <String>, calories: <Integer> } }. You're missing a "${requiredParameter}" property.` });
    }
  }

  Food.update(id, food_data)
    .then(food_id => {
      Food.find_by_id(food_id)
        .then(food => {
          response.status(200).json(food[0]);
        })
    })
    .catch(error => {
      response.status(400).json({ error });
    })
}

const destroy  = (request, response) => {
  Food.destroy(request.params.id)
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
}

module.exports = {
  index, show, create, update, destroy
}
