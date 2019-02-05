exports.seed = function(knex, Promise) {

  return knex.raw('TRUNCATE TABLE meal_foods RESTART IDENTITY')
    .then(() => {
      return Promise.all([

        knex('meal_foods').insert([{food_id: 6, meal_id: 1},
                                    {food_id: 4, meal_id: 2},
                                    {food_id: 7, meal_id: 2},
                                    {food_id: 1, meal_id: 3},
                                    {food_id: 2, meal_id: 3},
                                    {food_id: 8, meal_id: 3},
                                    {food_id: 11, meal_id: 4},
                                    {food_id: 6, meal_id: 5},
                                    {food_id: 10, meal_id: 5},
                                    {food_id: 9, meal_id: 6},
                                    {food_id: 12, meal_id: 6},
                                    {food_id: 7, meal_id: 6},
                                    {food_id: 3, meal_id: 7},
                                    {food_id: 7, meal_id: 7},
                                    {food_id: 2, meal_id: 8}

                              ], 'id')
        .then(() => console.log('Seeding MealFoods complete!'))
        .catch(error => console.log(`Error seeding MealFoods data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding MealFoods data: ${error}`));
};
