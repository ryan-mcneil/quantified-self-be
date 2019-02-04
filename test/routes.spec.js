const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
// const pry = require('pryjs');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
})

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('GET /api/v1/foods', () => {
    it('should return all of the foods', done => {
      chai.request(server)
        .get('/api/v1/foods')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(12);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Steak');
          response.body[0].should.have.property('calories');
          response.body[0].calories.should.equal(500);
          response.body[0].should.have.property('active');
          response.body[0].active.should.equal(true);
          done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return a specific food', done => {
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('name');
          response.body.name.should.equal('Steak');
          response.body.should.have.property('calories');
          response.body.calories.should.equal(500);
          response.body.should.have.property('active');
          response.body.active.should.equal(true);
          done();
      });
    });

    it('should return a 404 if id does not exist', done => {
      chai.request(server)
        .get('/api/v1/foods/1000')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find food with id 1000');
          done();
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should create a new food', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({ food: {
          name: 'Chicken Wings',
          calories: 9
        } })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.name.should.equal('Chicken Wings')
          response.body.calories.should.equal(9);
          done();
        });
    });

    it('should not create a record and return 422 if missing data', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({ food: {
          name: 'Chicken Wings'
        } })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(`Expected format: { food: { name: <String>, calories: <Integer> } }. You're missing a "calories" property.`);
          done();
        });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it ('should update a food', done => {
      chai.request(server)
        .put('/api/v1/foods/1')
        .send({ food: {
          name: 'Pasta',
          calories: 100
        } })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.id.should.equal(1);
          response.body.name.should.equal('Pasta');
          response.body.calories.should.equal(100);
          done();
        })
    })

    it ('should not update a record and return 422 if missing data', done => {
      chai.request(server)
      .put('/api/v1/foods/1')
      .send({ food: {
        name: 'Pasta'
      } })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.equal(`Expected format: { food: { name: <String>, calories: <Integer> } }. You're missing a "calories" property.`);
        done();
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    it ('should delete a food', done => {
      chai.request(server)
        .delete('/api/v1/foods/2')
        .end((err, response) => {
          response.should.have.status(204);
          done();
      });
    });

    it ('should not delete a food if id doesnt exist', done => {
      chai.request(server)
      .delete('/api/v1/foods/1000')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('error');
        response.body.error.should.equal('Could not find food with id 1000');
        done();
      });
    });
  });

  describe('GET /api/v1/meals', () => {
    it ('should get all meals', done => {
      chai.request(server)
      .get('/api/v1/meals')
      .end((err, response) => {

        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(8);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Breakfast');
        response.body[0].should.have.property('date');
        response.body[0].date.should.equal('2019-02-01T07:00:00.000Z');
        response.body[0].should.have.property('calorie_goal');
        response.body[0].calorie_goal.should.equal(400);
        response.body[0].foods.should.be.a('array');
        response.body[0].foods.length.should.equal(1);
        response.body[0].foods[0].should.be.a('object');
        response.body[0].foods[0].should.have.property('id');
        response.body[0].foods[0].should.have.property('name');
        response.body[0].foods[0].should.have.property('calories');

        response.body[1].name.should.equal('Lunch');
        response.body[1].date.should.equal('2019-02-01T07:00:00.000Z');
        response.body[1].calorie_goal.should.equal(700);
        response.body[1].foods.should.be.a('array');
        response.body[1].foods.length.should.equal(2);
        response.body[1].foods[0].should.be.a('object');
        done();
      })
    })
  })

  describe('GET /api/v1/meals/:meal_id/foods', () => {
    it ('should get foods for a specific meal', done => {
      chai.request(server)
      .get('/api/v1/meals/:meal_id/2')
      .end((err,response) => {
        response.body.should.have.status(200);
        response.body.should.be.json();
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.name.should.equal('Lunch');
        response.body.should.have.property('date');
        response.body.date.should.equal('2019-02-01T07:00:00.000Z');
        response.body.should.have.property('calorie_goal');
        response.body.calorie_goal.should.equal(700);
        response.body.foods.should.be.a('array');
        response.body.foods.length.should.equal(2);
        response.body.foods[0].should.be.a('object');
        response.body.foods[0].should.have.property('id');
        response.body.foods[0].should.have.property('name');
        response.body.foods[0].name.should.equal('Yogurt');
        response.body.foods[0].should.have.property('calories');
        response.body.foods[0].calories.should.equal(50);
      })
    })

    it('should return a 404 if id does not exist', done => {
      chai.request(server)
        .get('/api/v1/meals/1000/foods')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find meal with meal_id 1000');
          done();
      });
    });

  })

});
