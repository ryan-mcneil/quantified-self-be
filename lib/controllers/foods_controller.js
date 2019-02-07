const Food = require('../models/food')

const index = (request, response) => {
  Food.all()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
}

const show = (request, response) => {
  Food.select(request.params.id)
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

module.exports = {
  index, show
}
