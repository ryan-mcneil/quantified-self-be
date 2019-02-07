exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE TABLE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([

        knex('foods').insert([{name: 'Steak', calories: 500, active: true},
                              {name: 'Carrots', calories: 10, active: true},
                              {name: 'Pizza', calories: 777, active: true},
                              {name: 'Yogurt', calories: 50, active: true},
                              {name: 'Sesame Chicken', calories: 600, active: true},
                              {name: 'Eggs', calories: 200, active: true},
                              {name: 'Salad', calories: 100, active: true},
                              {name: 'Beans', calories: 250, active: true},
                              {name: 'Sandwich', calories: 450, active: true},
                              {name: 'Toast', calories: 100, active: true},
                              {name: 'Granola Bar', calories: 275, active: true},
                              {name: 'Soup', calories: 300, active: true},
                              {name: 'Liver', calories: 300, active: false},
                              ], 'id')
        .then(() =>
          console.log('Seeding Foods complete!'))
        .catch(error => console.log(`Error seeding Foods data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Foods data: ${error}`));


};
