
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('foods', (table) => {
      table.boolean('active');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('foods', (table) => {
      table.dropColumn('active');
    })
  ]);
};
