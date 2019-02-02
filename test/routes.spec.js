const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const pry = require('pryjs');

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
          response.body.length.should.equal(3);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Steak');
          response.body[0].should.have.property('calories');
          response.body[0].calories.should.equal(7);
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
          response.body.calories.should.equal(7);
          response.body.should.have.property('active');
          response.body.active.should.equal(true);
          done();
      });
    });

    it('should return a 404 if id does not exist', done => {
      chai.request(server)
        .get('/api/v1/foods/4')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find food with id 4');
          done();
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should create a new food', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          name: 'Chicken Wings',
          calories: 9
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          done();
        });
    });

    it('should not create a record and return 422 if missing data', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          name: 'Chicken Wings',
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(`Expected format: { name: <String>, calories: <Integer> }. You're missing a "calories" property.`);
          done();
        });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it ('should update a food', done => {
      chai.request(server)
        .put('/api/v1/foods/1')
        .send({
          name: 'Pasta',
          calories: 100;
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.name.should.equal('Pasta');
          response.body.calories.should.equal(100);
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
  });

  describe('DELETE /api/v1/foods/:id', () => {
    it ('should not delete a food if id doesnt exist', done => {
      chai.request(server)
        .delete('/api/v1/foods/4')
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find food with id 4');
          done();
      });
    });
  });

});
