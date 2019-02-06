exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([

        knex('meals').insert([{name: 'Breakfast', date: '2/1/19', calorie_goal: 400},
                              {name: 'Lunch', date: '2/1/19', calorie_goal: 700},
                              {name: 'Dinner', date: '2/1/19', calorie_goal: 800},
                              {name: 'Snack', date: '2/1/19', calorie_goal: 100},
                              {name: 'Breakfast', date: '2/2/19', calorie_goal: 400},
                              {name: 'Lunch', date: '2/2/19', calorie_goal: 700},
                              {name: 'Dinner', date: '2/2/19', calorie_goal: 800},
                              {name: 'Snack', date: '2/2/19', calorie_goal: 100},
                              {name: 'Breakfast', date: '2/3/19', calorie_goal: 400}
                              ], 'id')
        .then(() => console.log('Seeding Meals complete!'))
        .catch(error => console.log(`Error seeding Meals data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Meals data: ${error}`));
};
