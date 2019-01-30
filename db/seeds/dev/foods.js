exports.seed = function(knex, Promise) {

  return knex('foods').del() // delete all footnotes first
    .then(() => {
      return Promise.all([

        knex('foods').insert({name: 'Steak', calories: '7'}, 'id'),
        knex('foods').insert({name: 'Carrots', calories: '1000'}, 'id'),
        knex('foods').insert({name: 'Pizza', calories: '777'}, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
