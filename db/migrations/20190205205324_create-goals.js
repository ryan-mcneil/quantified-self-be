exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('goals', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('calories');

      table.timestamps(true, true);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('goals'),
  ]);
};
