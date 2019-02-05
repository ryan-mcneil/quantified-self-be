exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
    .then(knex('meals').del())
    .then(() => {
      return Promise.all([

        knex('meals').insert([{id: 1, name: 'Breakfast', date: '2/1/19', calorie_goal: 400},
                              {id: 2, name: 'Lunch', date: '2/1/19', calorie_goal: 700},
                              {id: 3, name: 'Dinner', date: '2/1/19', calorie_goal: 800},
                              {id: 4, name: 'Snack', date: '2/1/19', calorie_goal: 100},
                              {id: 5, name: 'Breakfast', date: '2/2/19', calorie_goal: 400},
                              {id: 6, name: 'Lunch', date: '2/2/19', calorie_goal: 700},
                              {id: 7, name: 'Dinner', date: '2/2/19', calorie_goal: 800},
                              {id: 8, name: 'Snack', date: '2/2/19', calorie_goal: 100}
                              ], 'id')
        .then(() => console.log('Seeding Meals complete!'))
        .catch(error => console.log(`Error seeding Meals data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Meals data: ${error}`));
};
