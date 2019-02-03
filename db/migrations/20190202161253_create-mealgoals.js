exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meal_foods', (table) => {
      table.increments('id').primary();
      table.integer('food_id').unsigned();
      table.foreign('food_id').references('foods.id').onDelete('CASCADE');
      table.integer('meal_id').unsigned();
      table.foreign('meal_id').references('meals.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
 return Promise.all([
   knex.schema.dropTable('meal_foods')
 ])
};
