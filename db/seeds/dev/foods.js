exports.seed = function(knex, Promise) {

  return knex('foods').del() // delete all footnotes first
    .then(() => {
      return Promise.all([

        knex('foods').insert([{id: 1, name: 'Steak', calories: 500},
                              {id: 2, name: 'Carrots', calories: 10},
                              {id: 3, name: 'Pizza', calories: 777},
                              {id: 4, name: 'Yogurt', calories: 50},
                              {id: 5, name: 'Sesame Chicken', calories: 600},
                              {id: 6, name: 'Eggs', calories: 200},
                              {id: 7, name: 'Salad', calories: 100},
                              {id: 8, name: 'Beans', calories: 250},
                              {id: 9, name: 'Sandwich', calories: 450},
                              {id: 10, name: 'Soup', calories: 300}
                              ], 'id')
        .then(() => console.log('Seeding Foods complete!'))
        .catch(error => console.log(`Error seeding Foods data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Foods data: ${error}`));
};
