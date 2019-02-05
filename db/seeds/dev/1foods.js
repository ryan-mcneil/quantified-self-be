exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE TABLE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([

        knex('foods').insert([{name: 'Steak', calories: 500},
                              {name: 'Carrots', calories: 10},
                              {name: 'Pizza', calories: 777},
                              {name: 'Yogurt', calories: 50},
                              {name: 'Sesame Chicken', calories: 600},
                              {name: 'Eggs', calories: 200},
                              {name: 'Salad', calories: 100},
                              {name: 'Beans', calories: 250},
                              {name: 'Sandwich', calories: 450},
                              {name: 'Toast', calories: 100},
                              {name: 'Granola Bar', calories: 275},
                              {name: 'Soup', calories: 300}
                              ], 'id')
        .then(() =>
          console.log('Seeding Foods complete!'))
        .catch(error => console.log(`Error seeding Foods data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Foods data: ${error}`));


};
