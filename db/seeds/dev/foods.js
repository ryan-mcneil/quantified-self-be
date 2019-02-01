exports.seed = function(knex, Promise) {

  return knex('foods').del() // delete all footnotes first
    .then(() => {
      return Promise.all([

        knex('foods').insert([{id: 1, name: 'Steak', calories: 7},
                              {id: 2, name: 'Carrots', calories: 1000},
                              {id: 3, name: 'Pizza', calories: 777}
                              ], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
