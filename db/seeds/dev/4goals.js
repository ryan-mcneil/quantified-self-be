exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE TABLE goals RESTART IDENTITY')
    .then(() => {
      return Promise.all([

        knex('goals').insert([{name: 'Breakfast', calories: 400},
                              {name: 'Lunch', calories: 700},
                              {name: 'Dinner', calories: 800},
                              {name: 'Snack', calories: 100}
                              ], 'id')
        .then(() =>
          console.log('Seeding Goals complete!'))
        .catch(error => console.log(`Error seeding Goals data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Goals data: ${error}`));


};
