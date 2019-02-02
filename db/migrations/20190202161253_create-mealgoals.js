exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meal_foods', (table) => {
      table.increments('id').primary();
      table.integer('food_id').references('foods.id');
      table.integer('meal_id').references('meals.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
 return Promise.all([
   knex.schema.dropTable('meal_foods')
 ])
};
