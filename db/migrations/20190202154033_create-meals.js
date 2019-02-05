exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.date('date');
      table.integer('calorie_goal');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals')
  ])
};
