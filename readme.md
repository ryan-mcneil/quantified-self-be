# Quantified Self Back-End

[Production Server Link](https://quantified-self-288.herokuapp.com)

[Agile Project Management Board](https://github.com/ryan-mcneil/quantified-self-be/projects/1)

Quantified Self is an application that allows users to track calorie intake. Foods  are created and added to Meals, which are organized by day. Goals can be set for corresponding meals, and this can be updated if needed.

This back end service creates an API with various endpoints (described below) for the front-end to consume. Here are the links for the front end:

[Production Server Link](https://ryan-mcneil.github.io/quantified-self-fe/)

[GitHub Repository](https://github.com/ryan-mcneil/quantified-self-fe)

## Initial Setup

1. Clone this repository:

  ```shell
  git clone https://github.com/ryan-mcneil/quantified-self-be.git
  ```
2. Change into the `quantified-self-be` directory

  ```shell
  cd quantified-self-be
  ```


3. Install the project dependencies:

  ```shell
  npm install
  ```

## Running the Server Locally

To have access to all the endpoints locally, you need to fire up a development server. Use the command:

```shell
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:3000/` to access your API.

## Endpoints

### GET '/api/v1/foods'
 * Returns array of all active Food Objects

[
  {
    "id": 3,
    "name": "Orange",
    "calories": 120,
    "created_at": "2019-01-31T01:52:08.575Z",
    "updated_at": "2019-01-31T01:52:08.575Z",
    "active": true
  },
  {
    "id": 6,
    "name": "Coffee",
    "calories": 90,
    "created_at": "2019-01-31T19:08:23.130Z",
    "updated_at": "2019-01-31T19:08:23.130Z",
    "active": true
  }
]

### GET '/api/v1/food/:id'
* Returns a specified food

{
  "id": 3,
  "name": "Orange",
  "calories": 120,
  "created_at": "2019-01-31T01:52:08.575Z",
  "updated_at": "2019-01-31T01:52:08.575Z",
  "active": true
}


### POST/PUT '/api/v1/foods[/:id]'
 * Create/update [specified] food
 * Data must be formatted like this:

{
  food: {
    name: 'Chicken Wings',
    calories: 9
  }
}

### DELETE '/api/v1/foods/:id'
* Deletes specified food

### GET '/api/v1/meals'
* Returns an array of all Meal objects with that meal's Food objects

[
  {
    "id": 3,
    "name": "Breakfast",
    "date": "2019-02-05T00:00:00.000Z",
    "calorie_goal": 400,
    "foods": [
      {
        "id": 58,
        "name": "Cereal",
        "calories": 360
      }
    ]
  },
  {
    "id": 4,
    "name": "Dinner",
    "date": "2019-02-05T00:00:00.000Z",
    "calorie_goal": 800,
    "foods": [
      {
        "id": 1,
        "name": "Buffalo Wings",
        "calories": 600
      },
      {
        "id": 60,
        "name": "Mountain Dew",
        "calories": 170
      }
    ]
  }
]

### GET '/api/v1/meals/:meal_id/foods'
* Returns a specified Meal object with that meal's Food objects

{
  "id": 3,
  "name": "Breakfast",
  "date": "2019-02-05T00:00:00.000Z",
  "calorie_goal": 400,
  "foods": [
    {
      "id": 58,
      "name": "Cereal",
      "calories": 360
    }
  ]
}

### '/api/v1/goals'
* Returns an array of all of the default Goal objects

[
  {
    "id": 2,
    "name": "Lunch",
    "calories": 700,
    "created_at": "2019-02-07T00:10:40.207Z",
    "updated_at": "2019-02-07T00:10:40.207Z"
  },
  {
    "id": 3,
    "name": "Dinner",
    "calories": 800,
    "created_at": "2019-02-07T00:10:40.207Z",
    "updated_at": "2019-02-07T00:10:40.207Z"
  },
  {
    "id": 4,
    "name": "Snack",
    "calories": 100,
    "created_at": "2019-02-07T00:10:40.207Z",
    "updated_at": "2019-02-07T00:10:40.207Z"
  },
  {
    "id": 1,
    "name": "Breakfast",
    "calories": 100,
    "created_at": "2019-02-07T00:10:40.207Z",
    "updated_at": "2019-02-07T00:10:40.207Z"
  }
]

* See routes for the rest of the available CRUD functionality for Meals and Goals

## Built With

* [JavaScript](https://www.javascript.com/)
* [Express.js](https://expressjs.com/)
* [Knex.js](https://knexjs.org/)

## Contributors

[Ryan McNeil](https://github.com/ryan-mcneil)

[Michael Gatewood](https://github.com/mngatewood)

## Known Issues

* Currently lacking some CRUD functionality for ease of database management by admin
